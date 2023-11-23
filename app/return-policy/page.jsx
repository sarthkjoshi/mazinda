import Head from 'next/head';

const ReturnPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 mt-2 mb-12">
      <Head>
        <title>Return Policy - Mazinda</title>
      </Head>
      <div className="text-center">
        <h1 className="text-3xl font-bold">Return Policy</h1>
      </div>
      <div className="mt-8">
        <ul className="list-disc list-inside pl-4">
          <li>Order once placed cannot be cancelled.</li>
          <li>Orders not been able to get delivered due to natural calamities are not liable for any refund.</li>
          <li>Mazinda do not offer any guaranteed time delivery.</li>
          <li>The refund request can only be raised if and only if all of the below mentioned criterias are met:</li>
          <li>The delivery personal does not contact through any means for the update of the order.</li>
          <li>The vendor has cancelled the order.</li>
          <li>The order has not been dispatched (no restriction of time frame).</li>
          <li>No natural calamities causing hindrance in delivery of the order placed.</li>
        </ul>
        <p>Process for requesting a refund:</p>
        <p>Visit the contact us section and fill in your query. Be assured to get resolution within 48 hours or else full refund will be issued by the company.</p>
      </div>
      <div className="mt-8">
        <p>The above conditions may change from time to time by the company to ensure serving in a better and proper way.</p>
      </div>
    </div>
  );
};

export default ReturnPolicy;