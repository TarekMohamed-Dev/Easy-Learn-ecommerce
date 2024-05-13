function ProductBanner({ product }) {
  const imageUrl = product?.attributes?.image?.data[0]?.attributes?.url;

  return (
    <div>
      {imageUrl ? (
        <img src={imageUrl} alt='banner' width={400} height={300} className='rounded-lg max-h-[300px] mb-5' />
      ) : (
        <div className='w-[300px] sm:w-[400px] h-[180px] sm:h-[200px] bg-slate-200 rounded-lg animate-pulse mb-5'></div>
      )}
    </div>
  );
}

export default ProductBanner;
