from livekit.agents import (Agent)
import logging
from agents.realestate.realestate_agent_prompt import REALESTATE_PROMPT_4
from agents.shared.tts_humanification_framework import TTS_HUMANIFICATION_FRAMEWORK

logger = logging.getLogger("agent")

class RealestateAgent(Agent):
    def __init__(self, room) -> None:
        super().__init__(
            # Instructions for the agent
            instructions=REALESTATE_PROMPT_4,
        )
        self.room = room 

    @property
    def welcome_message(self):
        # welcome_message = f"<emotion value='content' />“Hello sir, good day. May I speak with Avi please?”"
        welcome_message = "Hello! ... Good day. May I speak with Avi, please?"
        return welcome_message