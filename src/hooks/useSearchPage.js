import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const useSearchPage = () => {
  const { register, handleSubmit } = useForm();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState('No_Filter');
  const open = Boolean(anchorEl);

  const router = useRouter();
  const handleSearchQuery = ({ query }) => {
    router.push({ pathname: '/', query: { book: query, page: 1 } });
  };

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(!anchorEl);
  };

  const handleOptionSelect = (value) => {
    setAnchorEl(!anchorEl);
    setSelectedOption(value);
    console.log(value);
    // setSearchParams({ page: 1, query: query, filter: value });
  };

  return {
    register,
    handleSubmit,
    handleSearchQuery,
    handleFilterClick,
    handleFilterClose,
    handleOptionSelect,
    selectedOption,
    anchorEl,
    open,
  };
};

export default useSearchPage;
