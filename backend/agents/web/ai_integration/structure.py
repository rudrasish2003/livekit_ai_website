from pydantic import BaseModel, Field


class FlashcardImage(BaseModel):
    url: str | None = None
    alt: str | None = None
    aspectRatio: str | None = None


class Flashcard(BaseModel):
    type: str | None = None
    id: str | None = None  # Stable ID for deduplication
    title: str
    value: str
    accentColor: str | None = None
    icon: str | None = None
    theme: str | None = None
    size: str | None = None
    layout: str | None = None
    image: FlashcardImage | None = None


class UIStreamResponse(BaseModel):
    cards: list[Flashcard] = Field(default_factory=list)
