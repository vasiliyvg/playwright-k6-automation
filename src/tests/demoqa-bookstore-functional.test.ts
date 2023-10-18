import {test} from '../fixtures/page-fixtures';
import {books} from '../fixtures/books';

test.describe('Demo QA Bookstore Website functional testing', () =>
{
    test('Get the book details profile page',
        async ({
                        profilePage: profilePage,
                        bookStorePage: bookStorePage,
                        bookDetailsPage: bookDetailsPage
        }) =>
    {
        const bookNumberToSelect = 0;

        await profilePage.goto();
        await profilePage.goToStoreButton.click();
        await bookStorePage.shouldBeLoaded();
        await bookStorePage.linkToBookDetails(bookNumberToSelect).click();
        await bookDetailsPage.verifyThatBookHasAppropriateFields(books['Git Pocket Guide']);
    });
});
