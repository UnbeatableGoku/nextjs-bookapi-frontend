import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Rating } from 'react-simple-star-rating';

const BookDetail = ({ details }) => {
  const [descriptionData, setDescriptionData] = useState(true);
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  const img = details.volumeInfo.imageLinks.thumbnail
    ? details.volumeInfo.imageLinks.thumbnail
    : null;
  const title = details.volumeInfo.title ? details.volumeInfo.title : null;
  const subtitle = details.volumeInfo.subtitle
    ? details.volumeInfo.subtitle
    : 'No Subtitle Available';
  const description = details.volumeInfo.description
    ? details.volumeInfo.description
    : 'No Description Available';
  const smallDiscription = details.volumeInfo.description
    ? details.volumeInfo.description.slice(0, 450) + '...'
    : 'No Description Available';

  const publishedDate = details.volumeInfo.publishedDate
    ? details.volumeInfo.publishedDate
    : 'No Published Date Available';
  const publisher = details.volumeInfo.publisher
    ? details.volumeInfo.publisher
    : 'No Publisher Available';
  const avgRating = details.volumeInfo.avgRating
    ? details.volumeInfo.avgRating
    : 'NO Rating Available';
  return (
    <div className='grid relative grid-cols-1 sm:grid-cols-2 p-10 border-2 bg-indigo-100'>
      <button
        className='absolute bg-indigo-950 text-white font-bold p-2 rounded-md top-4 left-10'
        onClick={handleBack}
      >
        Back
      </button>

      <div className='max-w-[300px] w-full mx-auto py-4 '>
        <img
          src={img}
          className='object-contain w-full border-4 border-black'
        />
      </div>
      <div className='mx-auto flex flex-col '>
        <div className='text-4xl py-3'>
          <div>{title}</div>
        </div>
        <div className='text-xl'>
          <div>{subtitle}</div>
        </div>
        <div>
          {descriptionData ? (
            <div className='relative py-3'>
              <div
                dangerouslySetInnerHTML={{
                  __html: smallDiscription,
                }}
                className='inline'
              />
              <br></br>
              {description != 'No Description Available' && (
                <button
                  className=' relative start-0 bottom-0 text-sm border-b-2  border-indigo-900 font-extrabold p-1   '
                  onClick={() => setDescriptionData(!descriptionData)}
                >
                  Readmore
                </button>
              )}
            </div>
          ) : (
            <div className='relative py-3'>
              <div
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              />

              <br></br>
              <button
                className='relative  start-0 bottom-0 text-sm border-b-2  font-extrabold p-1 '
                onClick={() => setDescriptionData(!descriptionData)}
              >
                Go Back...
              </button>
            </div>
          )}
        </div>
        <div>
          <div className='grid grid-cols-2 py-3 border-b-2 border-indigo-400'>
            <div>Published Date</div>
            <div>{publishedDate}</div>
          </div>
          <hr></hr>
          <div className='grid grid-cols-2 py-3 border-b-2 border-indigo-400'>
            <div>Publisher </div>
            <div>{publisher}</div>
          </div>
          <hr></hr>
          <div className='grid grid-cols-2 py-3 border-b-2 border-indigo-400'>
            <div>Rating </div>
            <Rating
              initialValue={avgRating}
              allowFraction={true}
              iconsCount={5}
              readonly={true}
              size={14}
              fillColor={'#4b0082'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
