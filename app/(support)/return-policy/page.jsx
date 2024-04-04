import Head from "next/head";

const ReturnPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 mt-2 mb-12">
      <Head>
        <title>Return and Refund Policy - Mazinda</title>
      </Head>
      <div className="text-center">
        <h1 className="text-3xl font-bold">Return and Refund Policy</h1>
      </div>
      <div className="mt-8">
        <ul className="list-disc list-inside pl-4">
          <li>
            You may replace this item within 24 hours of buying if in case the
            item is found faulty, damaged or incorrect.
          </li>
          <li>
            After 24 hours, kindly contact the brand service center. In case of
            an incorrect item, you may raise a replacement request only if the
            item is sealed/unopened/unused and in original condition.
          </li>
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
          <li>Order once placed cannot be cancelled.</li>
          <li>
            Orders not been able to get delivered due to natural calamities are
            not liable for any refund.
          </li>
          <li>Mazinda do not offer any guaranteed time delivery.</li>
          <li>
            The refund request can only be raised if and only if all of the
            below mentioned criterias are met:
          </li>
          <li>
            The delivery personal does not contact through any means for the
            update of the order.
          </li>
          <li>The vendor has cancelled the order.</li>
          <li>
            The order has not been dispatched (no restriction of time frame).
          </li>
          <li>
            No natural calamities causing hindrance in delivery of the order
            placed.
          </li>
        </ul>
      </div>
      <div className="my-10">
        <h1 className="text-xl font-semibold">
          Process for requesting a refund:
        </h1>
        <p>
          Visit the contact us section and fill in your query. Be assured to get
          resolution within 48 hours or else full refund will be issued by the
          company.
        </p>
      </div>
    </div>
  );
};

export default ReturnPolicy;
