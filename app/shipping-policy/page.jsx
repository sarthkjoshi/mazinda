import Head from 'next/head';

const ShippingPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 mt-2 mb-12">
      <Head>
        <title>Shipping Policy - Mazinda</title>
      </Head>
      <div className="text-center">
        <h1 className="text-3xl font-bold">Shipping and Delivery conditions</h1>
      </div>
      <div className="mt-8">
        <ul className="list-disc list-inside pl-4">
          <li>The shipping costs vary depending on the location of the signee.</li>
          <li>Exact shipping charges or any other associated costs are well informed on the checkout page.</li>
          <li>The estimated delivery time may vary from product to product between 30 minutes to 24 hours.</li>
          <li>The order tracking involves the following steps, pending, processing, on the way followed by delivered.</li>
        </ul>
      </div>
      <div className="mt-8">
        <p>The above conditions may change from time to time by the company to ensure serving in a better and proper way.</p>
      </div>
    </div>
  );
};

export default ShippingPolicy;