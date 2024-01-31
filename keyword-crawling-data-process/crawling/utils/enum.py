from enum import Enum

class ExtendedEnum(Enum):

    @classmethod
    def list(cls):
        return [c.value for c in cls]

class BoardId(ExtendedEnum):
    FREE = '370456'
    SECRET = '257708'
    GRADUATE = '385968'
    FRESHMAN = '374638'
    ISSUE = '482584'
    MARKET = '370477'
    INFO = '258611'
    PROMOTION = '367438'
    CLUB = '418776'