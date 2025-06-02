// import React from 'react';
// import PaymentPlanList from './PaymentPlanList';
// import PaymentPlanForm from './PaymentPlanForm';

// const App = () => {
//   return (
//     <div>
//       <PaymentPlanList />
//       <PaymentPlanForm />
//     </div>
//   );
// };

// export default App;



import React from 'react';
import { useTranslation } from "react-i18next";

const PaymentPlans = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const selectedPlans = i18n.language === "ar" ? paymentPlansAR : paymentPlansEN;

  function toArabicNumber(number) {
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return number.toString().replace(/\d/g, d => arabicDigits[d]);
  }

  return (
    <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
      className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-4">{t("TAORMINA")}</h1>
      <p className="text-lg mb-4">{t("complitin_Q4_2027")}</p>
      <p className="mb-4">
        <strong>{t("note")}</strong> {t("We_have_6_different_payment_plans")}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {selectedPlans.map((plan, index) => (
          <div key={index} className="bg-white border p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">
              {t("plan")} {i18n.language === 'ar' ? toArabicNumber(index + 1) : index + 1}
            </h2>
            <p>
              <strong>{plan.downpayment}</strong>
            </p>
            <p>
              <strong>{plan.discount}</strong>
            </p>
            <p>
              <strong>{plan.monthlyPayment}</strong>
            </p>
            <p>
              <strong>{plan.completion}</strong>
            </p>
          </div>
        ))}
      </div>
      {/* bg-red-700 */}
      <div className="mt-8 p-4 text-red-700 font-bold text-xl rounded-xl">
        <p>{t("Please_use_AR-20_to_access_these_offers")}</p>
      </div>
    </div>

  );
};

const paymentPlansEN = [
  {
    downpayment: '10% DOWNPAYMENT',
    discount: '5% DISCOUNT',
    monthlyPayment: '1% MONTHLY for 50 months',
    completion: '70% Directly on Completion',
  },
  {
    downpayment: '20% DOWNPAYMENT',
    discount: '10% DISCOUNT',
    monthlyPayment: '1% MONTHLY for 50 months',
    completion: '80% Directly on Completion',
  },
  {
    downpayment: '30% DOWNPAYMENT',
    discount: '15% DISCOUNT',
    monthlyPayment: '1% MONTHLY for 50 months',
    completion: 'Directly on Completion',
  },
  {
    downpayment: '30% DOWNPAYMENT',
    discount: '5% DISCOUNT',
    monthlyPayment: 'ZERO MONTHLY',
    completion: '70% Directly on Completion',
  },
  {
    downpayment: '20% DOWNPAYMENT',
    discount: '0% DISCOUNT',
    monthlyPayment: 'ZERO MONTHLY',
    completion: '80% Directly on Completion',
  },
  {
    downpayment: 'Full Cash in 6 months',
    discount: '40% DISCOUNT',
    monthlyPayment: '',
    completion: '',
  },
];
const paymentPlansAR = [
  {
    downpayment: '١٠٪ دفعة أولى',
    discount: '٥٪ خصم',
    monthlyPayment: '١٪ شهرياً لمدة ٥٠ شهراً',
    completion: '٧٠٪ مباشرة عند التسليم',
  },
  {
    downpayment: '٢٠٪ دفعة أولى',
    discount: '١٠٪ خصم',
    monthlyPayment: '١٪ شهرياً لمدة ٥٠ شهراً',
    completion: '٨٠٪ مباشرة عند التسليم',
  },
  {
    downpayment: '٣٠٪ دفعة أولى',
    discount: '١٥٪ خصم',
    monthlyPayment: '١٪ شهرياً لمدة ٥٠ شهراً',
    completion: 'مباشرة عند التسليم',
  },
  {
    downpayment: '٣٠٪ دفعة أولى',
    discount: '٥٪ خصم',
    monthlyPayment: 'دون أقساط شهرية',
    completion: '٧٠٪ مباشرة عند التسليم',
  },
  {
    downpayment: '٢٠٪ دفعة أولى',
    discount: '٠٪ خصم',
    monthlyPayment: 'دون أقساط شهرية',
    completion: '٨٠٪ مباشرة عند التسليم',
  },
  {
    downpayment: 'دفع كامل خلال ٦ أشهر',
    discount: '٤٠٪ خصم',
    monthlyPayment: '',
    completion: '',
  },
];


export default PaymentPlans;
