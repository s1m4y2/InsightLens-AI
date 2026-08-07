from abc import ABC, abstractmethod


class BaseReport(ABC):

    @abstractmethod
    def generate(
        self,
        reviews
    ):
        pass