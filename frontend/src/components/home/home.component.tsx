import { useEffect } from "react";
import { motion } from "framer-motion";
import CommunitySpotlightComponent from "./community_spotlight/community_spotlight.component";
import FeatureComponent from "./feature/feature.component";
import LatestPostsComponent from "./latest_posts/latest_posts.component";
import FeatureProfileComponent from "./feature_profile/feature_profile.component";
import TrendingTopicComponent from "./trending_topic/trending_topic.component";
import RecommendedWritersComponent from "./recommended_writers/recommended_writers.component";
import ResourceComponent from "./resources/resources.component";
import PricingComponent from "./pricing/pricing.component";
import WriterFeedbackComponent from "./writer_feedback/writer_feedback.component";
import StartWritingComponent from "./start_writing/start_writing.component";
import Contactus from "../contactus/contactus";
import PersonalizedRecommendationsComponent from "./personalized_recommendations/personalized_recommendations.component";
import { isLoggedIn } from "../../services/auth.service";
import BackToTop from "../ScrollToTopButton";

const HomeComponent = () => {
  const isLogin = isLoggedIn();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <>
      <div className="story-page-shell grid grid-cols-12 items-start gap-6 py-12 sm:gap-8 lg:gap-10 lg:py-16">
        <div className="col-span-12 lg:col-span-12 min-w-0">
          <FeatureComponent />
          <LatestPostsComponent />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-15">
              <TrendingTopicComponent />
              <RecommendedWritersComponent />
              {isLogin && <FeatureProfileComponent />}
              {isLogin && <PersonalizedRecommendationsComponent />}
            </div>
        </div>
        
      </div>
      <motion.div variants={itemVariants}><CommunitySpotlightComponent /></motion.div> 
      <motion.div variants={itemVariants}><ResourceComponent /></motion.div>
      <motion.div variants={itemVariants}><WriterFeedbackComponent /></motion.div>
      <motion.div variants={itemVariants}><PricingComponent /></motion.div>
      <motion.div variants={itemVariants}><StartWritingComponent /></motion.div>
      <BackToTop />
    </div>
    </motion.div>
  );
};

export default HomeComponent;
