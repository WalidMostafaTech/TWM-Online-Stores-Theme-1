import Hero from "./sections/Hero";
import { useQuery } from "@tanstack/react-query";
import { getHome } from "@/api/homeServices";
import SeoManager from "@/utils/SeoManager";

const Home = () => {
  const { data: homeData, isLoading } = useQuery({
    queryKey: ["home"],
    queryFn: getHome,
  });

  return (
    <>
      <SeoManager
        title={homeData?.seo?.meta_title}
        description={homeData?.seo?.meta_description}
        keywords={homeData?.seo?.keywords}
        canonical={homeData?.seo?.canonical_url}
        ogImage={homeData?.seo?.og_image}
      />

      <main>
        <Hero data={homeData?.intro} loading={isLoading} />
      </main>
    </>
  );
};

export default Home;
