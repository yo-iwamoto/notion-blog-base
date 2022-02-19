import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

export default function () {
  return (
    <div className='mt-20 text-center'>
      <h1 className='font-bold'>RESOURCE NOT FOUND</h1>
      <div className='h-12' />
      <Link href='/'>
        <span className='flex cursor-pointer items-center justify-center'>
          <span>TOP</span>
          <span className='w-2' />
          <FaArrowRight size={12} className='text-gray-500' />
        </span>
      </Link>
    </div>
  );
}
