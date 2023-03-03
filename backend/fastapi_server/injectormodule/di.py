from injector import Binder, Module, provider, singleton
from databases import Database

from infra.test_form_impl import TestFormImpl
from repository.test_form_repository import TestFormRepository


@singleton
class TestFormModule(Module):
    def __init__(self, db: Database) -> None:
        self.__db = db

    def configure(self, binder: Binder) -> None:
        binder.bind(TestFormRepository, TestFormImpl)

    @provider
    def getDatabase(self) -> Database:
        return self.__db
