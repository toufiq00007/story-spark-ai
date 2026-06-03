import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Post } from "../../../models/post";
import { useGetLatestListsQuery } from "../../../redux/apis/post.api";
import LoadingAnimation from "../../loading/loading.component";

const INITIAL_VISIBLE_COUNT = 6;

const LatestPostsComponent = () => {
  const { data, isLoading, isError, refetch } = useGetLatestListsQuery(undefined);
  const navigate = useNavigate();
  const [showAllPosts, setShowAllPosts] = useState(false);
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);

  useEffect(() => {
    setShowAllPosts(false);
  }, [data?.posts]);

  if (isLoading) return <LoadingAnimation />;

  if (isError) {
    return (
      <section className="mb-12 text-slate-100">
        <h2 className="mb-6 text-2xl font-bold">Latest Posts</h2>
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-5 text-center text-red-200">
          <p className="mb-3 font-semibold">Failed to load latest posts.</p>
          <button
            onClick={() => refetch()}
            className="rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  const seenIds = new Set<string>();
  const uniquePosts = (data?.posts ?? []).filter((post: Post) => {
    if (!post?._id || seenIds.has(post._id)) return false;
    seenIds.add(post._id);
    return true;
  });

  const shouldShowLoadMore = uniquePosts.length > INITIAL_VISIBLE_COUNT;
  const visiblePosts =
    showAllPosts || !shouldShowLoadMore
      ? uniquePosts
      : uniquePosts.slice(0, INITIAL_VISIBLE_COUNT);

  const toggleAccordion = (postId: string) => {
    setExpandedPostId((prevId) => (prevId === postId ? null : postId));
  };

  return (
<>
    <h2 className="mb-6 text-2xl font-bold">Latest Posts</h2>
    <section className="text-slate-100">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-h-[600px] overflow-y-auto pr-2">
        {(data?.posts ?? []).length > 0 ? (
          (data?.posts ?? []).map((post: Post) => (
            <button key={post._id} onClick={() => navigate(`/post/${post._id}`)} className="motion-card-subtle story-panel rounded-lg p-5 text-left">
              <h3 className="mb-2 text-xl font-bold text-slate-100">{post.title}</h3>
              <p className="line-clamp-2 text-slate-400">{post.content || ""}</p>
            </button>
            
          ))
        ) : (
          <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/20 px-4 py-5 text-slate-500 dark:text-slate-400">
            Posts are not available.
          </div>
        )}
      </div>
    </section>
</>
      {shouldShowLoadMore && !showAllPosts && (
        <div className="mt-6">
          <button
            type="button"
            onClick={() => setShowAllPosts(true)}
            className="motion-cta cursor-pointer rounded-lg border border-slate-300/70 bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm hover:bg-white dark:border-white/15 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
};

export default LatestPostsComponent;