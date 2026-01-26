# from agents.base_agent import BaseAgentWithCustomSTT
from livekit.agents import function_tool, RunContext, Agent
import chromadb
import logging
import json
import asyncio
from agents.web.ai_integration.functions import UIAgentFunctions
from agents.web.web_agent_prompt import WEB_AGENT_PROMPT2
from agents.web.ui_context_manager import UIContextManager
from shared_humanization_prompt.tts_humanificaiton_elevnlabs import (
    TTS_HUMANIFICATION_ELEVNLABS,
)

logger = logging.getLogger(__name__)


class Webagent(Agent):
    def __init__(self, room) -> None:
        self._base_instruction = WEB_AGENT_PROMPT2 + TTS_HUMANIFICATION_ELEVNLABS
        super().__init__(
            # Instructions for the agent (will be updated dynamically with UI context)
            instructions=self._base_instruction,
        )
        self.room = room
        self.chroma_client = chromadb.PersistentClient(path="./vector_db")
        self.collection = self.chroma_client.get_or_create_collection(
            name="indusnet_website"
        )
        self.db_fetch_size = 5
        # UI Context Manager for state tracking and redundancy prevention
        self.ui_context_manager = UIContextManager()
        self.ui_agent_functions = UIAgentFunctions()

    # Get UI context from frontend and update agent instructions
    def update_ui_context(self, context_payload: dict) -> None:
        """Process UI context sync from frontend and update agent state."""
        if not isinstance(context_payload, dict):
            logger.info("UI context ignored (non-dict payload)")
            return
        
        logger.info("UI context received: %s", context_payload)
        
        # Update the context manager with new state
        self.ui_context_manager.update_from_sync(context_payload)
        
        # Update agent instructions with current UI state
        self._update_instructions_with_context()
    
    def _update_instructions_with_context(self) -> None:
        """Inject current UI state into agent instructions."""
        ui_context_prompt = self.ui_context_manager.generate_context_prompt()
        new_instructions = self._base_instruction + ui_context_prompt
        self.update_instructions(new_instructions)
        logger.debug("Agent instructions updated with UI context")

    def is_content_visible(self, element_id: str = "", title: str = "") -> bool:
        """Check if content is already visible on screen."""
        if element_id and self.ui_context_manager.is_visible(element_id):
            return True
        if title and self.ui_context_manager.is_title_visible(title):
            return True
        return False

    # Welcome message property
    @property
    def welcome_message(self):
        return (
            "Welcome to Indus Net Technologies."
            " I'm Vyom, your web assistant. How can I help you today?"
        )

    # lookup_website_information tool
    @function_tool
    async def lookup_website_information(self, context: RunContext, question: str):
        """Use this tool to answer any questions about Indus net Technologies."""
        logger.info(f"looking for {question}")
        results = self.collection.query(
            query_texts=[question], n_results=self.db_fetch_size
        )
        documents = results.get("documents") or []

        # Flatten and join all text into a single clean markdown string
        flat_documents = [item for sublist in documents for item in sublist]
        joined = "\n\n---\n\n".join(
            doc.strip() for doc in flat_documents if doc.strip()
        )

        # Optionally strip excessive whitespace, remove duplicate consecutive lines
        cleaned = "\n".join(
            line
            for i, line in enumerate(joined.splitlines())
            if line.strip()
            and (i == 0 or line.strip() != joined.splitlines()[i - 1].strip())
        )

        # Stream UI updates as a background task with redundancy filtering
        asyncio.create_task(
            self._publish_ui_stream(
                user_input=question, db_results=cleaned
            )
        )
        return cleaned

    async def _publish_ui_stream(
        self, user_input: str, db_results: str
    ) -> None:
        """Generate and publish UI cards, filtering out already-visible content."""
        # Get current UI context for the AI agent to consider
        ui_context = self.ui_context_manager.to_dict()
        
        async for payload in self.ui_agent_functions.query_process_stream(
            user_input=user_input, db_results=db_results, ui_context=ui_context
        ):
            # Check for redundancy before publishing
            title = payload.get("title", "")
            card_id = payload.get("id", payload.get("card_id", ""))
            
            if self.is_content_visible(element_id=card_id, title=title):
                logger.info(f"⏭️ Skipping redundant card: {title}")
                continue
            
            try:
                await self.room.local_participant.publish_data(
                    json.dumps(payload).encode("utf-8"),
                    reliable=True,
                    topic="ui.flashcard",
                )
                logger.info("✅ Data packet sent successfully: %s", title)
            except Exception as e:
                logger.error(f"❌ Failed to publish data: {e}")
