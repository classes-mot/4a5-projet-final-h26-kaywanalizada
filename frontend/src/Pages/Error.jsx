import { useTranslation } from "react-i18next";
const ErrorPage = () => {
  const { t } = useTranslation();
  return (
    <main>
      <h1>{t("404 - Page non trouvée")}</h1>
      <p>{t("Impossible de trouver cette page")}</p>
    </main>
  );
};

export default ErrorPage;
