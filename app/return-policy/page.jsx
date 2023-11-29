import Head from "next/head";

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
          <li>
            Return Policy is till 24 hours from the time of delivery for
            non-perishable items.
          </li>
          <li>
            The customer has to mail at contact@mazinda.com , if the request is
            approved by the seller, then only return is allowed.
          </li>
          <li>
            Some items as stated in the item description, are non-returnable.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ReturnPolicy;