import _ from 'lodash';
import { allBooks } from 'src/graphql/query';
import { client } from 'src/graphql/client';
import SearchBox from '@components/SearchBox';
import BookList from '@components/BookList';
import { useRouter } from 'next/router';
import { Pagination, Stack } from '@mui/material';
import { useState } from 'react';
import Header from '@components/Header';
import { getSession } from 'next-auth/react';
export default function SearchPage({ books }) {
  const router = useRouter();
  const { query } = router;
  const { filter } = query;
  const index = parseInt(query.page);
  const handleChange = (event, value) => {
    console.log(query);
    if (filter) {
      router.push({
        pathname: '/',
        query: { book: query.book, page: value, filter: filter },
      });
    } else {
      router.push({ pathname: '/', query: { book: query.book, page: value } });
    }
  };
  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <div className='bg-slate-200 text-black relative'>
      <Header />
      <SearchBox books={books} />
      {_.size(query) > 0 ? (
        _.size(books) > 0 ? (
          <div className='container mx-auto relative'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4  '>
              {books.map((book) => (
                <BookList book={book} key={book.id} />
              ))}
            </div>
            <Stack
              spacing={2}
              display='flex'
              justifyContent='center'
              direction='row'
              mt={10}
            >
              <Pagination
                count={10}
                variant='outlined'
                page={index}
                shape='rounded'
                onChange={handleChange}
              />
            </Stack>
            <div
              onClick={handleScroll}
              className='cursor-pointer sticky bottom-0 sm:bottom-10 w-fit mx-4  bg-indigo-300 border-2 border-indigo-950 rounded-md p-2 hover:border-indigo-400'
            >
              <button>
                <>
                  <svg
                    enableBackground='new 0 0 32 32'
                    height={34}
                    id='Layer_1'
                    version='1.1'
                    viewBox='0 0 32 32'
                    width={34}
                    xmlSpace='preserve'
                    xmlns='http://www.w3.org/2000/svg'
                    xmlnsXlink='http://www.w3.org/1999/xlink'
                  >
                    <path
                      d='M18.221,7.206l9.585,9.585c0.879,0.879,0.879,2.317,0,3.195l-0.8,0.801c-0.877,0.878-2.316,0.878-3.194,0  l-7.315-7.315l-7.315,7.315c-0.878,0.878-2.317,0.878-3.194,0l-0.8-0.801c-0.879-0.878-0.879-2.316,0-3.195l9.587-9.585  c0.471-0.472,1.103-0.682,1.723-0.647C17.115,6.524,17.748,6.734,18.221,7.206z'
                      fill='#515151'
                    />
                  </svg>
                </>
              </button>
            </div>
          </div>
        ) : (
          <div className='text-red-800 text-center font-bold'>
            NO BOOKS FOUND!!!!!
          </div>
        )
      ) : (
        <div className='text-center font-bold text-lg capitalize text-indigo-900'>
          search book here!!
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const session = await getSession(context);

  console.log(session);
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: true,
      },
    };
  }
  if (_.size(query) > 0) {
    try {
      const page = parseInt(query.page);
      const { data } = await client.query({
        query: allBooks,
        variables: {
          input: {
            index: page > 1 ? page * 10 : 1,
            userquery: query.book,
            filter: query.filter ? query.filter : null,
          },
        },
      });
      return { props: { books: data.books, query } };
    } catch (error) {
      console.log(error);
      return { props: { books: null, query } };
    }
  } else {
    return { props: { books: null, query } };
  }
}
