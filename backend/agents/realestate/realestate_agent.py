from livekit.agents import (Agent)
import logging
from agents.realestate.realestate_agent_prompt import REALESTATE_PROMPT, REALESTATE_PROMPT2
from agents.shared.tts_humanification_framework import TTS_HUMANIFICATION_FRAMEWORK

logger = logging.getLogger("agent")

class RealestateAgent(Agent):
    def __init__(self, room) -> None:
        super().__init__(
            # Instructions for the agent
            instructions=REALESTATE_PROMPT + TTS_HUMANIFICATION_FRAMEWORK,
        )
        self.room = room 

    @property
    def welcome_message(self):
        welcome_message = f"<emotion value='excited' />Hi, this is VYOM calling from the House of Abhinandan Lodha team regarding your interest in one of our residential projects. Do you have 2 to 3 minutes to talk?"
        return welcome_message