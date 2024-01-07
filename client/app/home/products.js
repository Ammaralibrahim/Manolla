import React from 'react';

const products = [
  {
    id: 1,
    name: 'Chanel',
    price: '12',
    image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auhref=format&fit=crop&w=376&q=80',
  },
  {
    id: 2,
    name: 'Man Mix',
    price: '12',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?ixlib=rb-1.2.1&auhref=format&fit=crop&w=1500&q=80',
  },
  {
    id: 3,
    name: 'Classic Watch',
    price: '12',
    image: 'https://images.unsplash.com/photo-1532667449560-72a95c8d381b?ixlib=rb-1.2.1&auhref=format&fit=crop&w=750&q=80',
  },
  {
    id: 4,
    name: 'Woman Mix',
    price: '12',
    image: 'https://images.unsplash.com/photo-1590664863685-a99ef05e9f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auhref=format&fit=crop&w=345&q=80',
  },
];

const CardList = () => {
  return (
    <div className="mt-16">
      <h3 className="text-black text-2xl font-medium">Fashions</h3>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="w-full max-w-sm mx-auto   shadow-md overflow-hidden bg-white text-black"
          >
            <div
              className="flex items-end justify-end h-56 w-full bg-cover"
              style={{
                backgroundImage: `url("${product.image}")`,
              }}
            >
              <button className="p-2 rounded-full bg-white text-black mx-5 -mb-4 hover:bg-black focus:outline-none focus:bg-black">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>
            </div>
            <div className="px-5 py-3">
              <h3 className="text-black uppercase">{product.name}</h3>
              <span className="text-black mt-2">{product.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardList;
