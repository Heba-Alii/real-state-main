import React from "react";
import { useTranslation } from "react-i18next";


const PaymentPlans = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  function toArabicNumber(number) {
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return number.toString().replace(/\d/g, d => arabicDigits[d]);
  }

  const paymentPlansEN = [
    {
      plan: "Silver Plan",
      downpayment: "20% Down Payment (DP)",
      monthlyPayment: "50% During the project",
      completion: "30% upon Handover (HO)",
    },
    {
      plan: "Gold Plan",
      downpayment: "50% Down Payment (DP)",
      monthlyPayment: "20% During the project",
      completion: "30% upon Handover (HO)",
    },
    {
      plan: "Platinum Plan",
      downpayment: "Full Payment upfront",
      monthlyPayment: "",
      completion: "",
    },
  ];
  const paymentPlansAR = [
    {
      plan: "الخطة الفضية",
      downpayment: "٢٠٪ دفعة مقدمة (DP)",
      monthlyPayment: "٥٠٪ خلال مدة المشروع",
      completion: "٣٠٪ عند التسليم (HO)",
    },
    {
      plan: "الخطة الذهبية",
      downpayment: "٥٠٪ دفعة مقدمة (DP)",
      monthlyPayment: "٢٠٪ خلال مدة المشروع",
      completion: "٣٠٪ عند التسليم (HO)",
    },
    {
      plan: "الخطة البلاتينية",
      downpayment: "الدفع الكامل مقدماً",
      monthlyPayment: "",
      completion: "",
    },
  ];

  const paymentPlans = i18n.language === 'ar' ? paymentPlansAR : paymentPlansEN;

  return (
    <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
      className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-4">{t("BINGHATTI_PHANTOM")}</h1>
      <p className="mb-4">
        {/* <strong>{t("note")}{"  "}</strong>{t("we_have")} {paymentPlans.length} {t("3_different_payment_plans")} */}
        <strong>{t("note")}{"  "}</strong>
        {t("we_have")}{" "}
        {i18n.language === 'ar' ? toArabicNumber(paymentPlans.length) : paymentPlans.length}{" "}
        {t("3_different_payment_plans")}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paymentPlans.map((plan, index) => (
          <div key={index} className="bg-white border p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">
              {plan.plan}
            </h2>
            {plan.downpayment && (
              <p>
                <strong>{plan.downpayment}</strong>
              </p>
            )}
            {plan.monthlyPayment && (
              <p>
                <strong>{plan.monthlyPayment}</strong>
              </p>
            )}
            {plan.completion && (
              <p>
                <strong>{plan.completion}</strong>
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 text-red-700 font-bold text-xl rounded-xl">
        <p>{t("Please_use_AR-15_to_access_these_offers")}</p>
      </div>
    </div>
  );
};

export default PaymentPlans;
