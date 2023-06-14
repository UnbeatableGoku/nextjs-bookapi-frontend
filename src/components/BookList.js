import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Rating } from 'react-simple-star-rating';
const BookList = ({ book }) => {
  const img = book.volumeInfo.imageLinks.thumbnail
    ? book.volumeInfo.imageLinks.thumbnail
    : null;
  const title = book.volumeInfo.title;
  const saleInfo =
    book.saleInfo.saleability === 'FOR_SALE' ? 'For Sale' : 'Not For Sale';
  const buyLink =
    book.saleInfo.saleability === 'FOR_SALE' ? book.saleInfo.buyLink : null;
  const avgRating = book.volumeInfo.averageRating
    ? book.volumeInfo.averageRating
    : null;
  const description = book.volumeInfo.description
    ? book.volumeInfo.description.slice(0, 70)
    : 'No Description Available';
  return (
    <div className='max-w-[250px] w-full   mx-auto m-3 bg-gray-100 rounded-md  relative overflow-hidden transition-all duration-300  hover:max-w-[280px] shadow-md shadow-violet-500 hover:shadow-violet-950 hover:shadow-lg  '>
      <div className='  h-full rounded-md border border-slate-300   '>
        <div className='h-[250px] pt-3'>
          <Image
            src={img}
            alt={title}
            width={250}
            height={250}
            className=' object-contain w-full h-full '
          />
        </div>
        <div className='font-light py-2 px-3 text-xl  text-slate-950 uppercase'>
          {title.slice(0, 14)}...
        </div>

        <div
          className={`absolute top-1 right-1 w-36 shadow-md shadow-black text-center font-bold p-2  text-xs transform rotate-45 -translate-y-1/2 translate-x-1/2 ${
            saleInfo === 'For Sale' ? 'bg-green-800' : 'bg-red-800'
          } text-white m-7`}
        >
          {saleInfo}
        </div>

        {avgRating ? (
          <div className='px-3 '>
            <Rating
              initialValue={avgRating}
              allowFraction={true}
              iconsCount={5}
              readonly={true}
              size={14}
              fillColor={'#4b0082'}
            />
          </div>
        ) : (
          <div className='px-3 text-red-700'>No Rating</div>
        )}
        <div>
          <div className='px-3 pt-3 text-gray-500 font-medium'>
            {description}...
          </div>
          <Link href={`/book/${book.id}`}>
            <button className='bg-indigo-400 text-white font-bold px-3 py-2  rounded-sm m-3 hover:bg-indigo-700 hover:text-white'>
              Learn More...
            </button>
          </Link>
        </div>
      </div>
      {saleInfo === 'For Sale' && (
        <div className='absolute bottom-4 cursor-pointer right-2'>
          <Link href={`${buyLink}`}>
            <img
              src={
                'https://seeklogo.com/images/G/google-play-books-logo-FB96539C88-seeklogo.com.png'
              }
              width={27}
            />
          </Link>
        </div>
      )}
    </div>
  );
};

export default BookList;
