import { gql } from '@apollo/client';

const allBooks = gql`
  query getBooks($input: criteria!) {
    books(input: $input) {
      id
      volumeInfo {
        title
        description
        authors
        averageRating
        publishedDate
        imageLinks {
          thumbnail
        }
      }
      saleInfo {
        saleability
        buyLink
        retailPrice {
          amount
        }
      }
    }
  }
`;

const Single_Book = gql`
  query singleBook($bookId: String) {
    book(bookId: $bookId) {
      volumeInfo {
        description
        subtitle
        title
        publishedDate
        averageRating
        publisher
        imageLinks {
          thumbnail
        }
      }
    }
  }
`;
export { allBooks, Single_Book };
