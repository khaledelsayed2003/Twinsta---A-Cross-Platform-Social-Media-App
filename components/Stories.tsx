import { useAuth } from '@clerk/clerk-expo';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { styles } from "@/styles/feed.styles";
import { ScrollView } from "react-native";
import Story from "./Story";

const StoriesSection = () => {
  const { userId: clerkId } = useAuth();
  const currentUser = useQuery(api.users.getUserByClerkId, clerkId ? { clerkId } : 'skip');

  const STORIES = [
    {
      id: "1",
      username: "You",
      avatar: currentUser?.image || "https://via.placeholder.com/40",
      hasStory: false,
    },
    {
      id: "2",
      username: "Elon Musk",
      avatar: "https://www.technowize.com/wp-content/uploads/2019/09/most-influential-people-in-tech-elon-musk.jpg",
      hasStory: true,
    },
    {
      id: "3",
      username: "Bill Gates",
      avatar: "https://www.technowize.com/wp-content/uploads/2019/09/most-influentual-people-in-tech-bill.jpg",
      hasStory: true,
    },
    {
      id: "4",
      username: "Sam Altman",
      avatar: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Sam_Altman_TechCrunch_SF_2019_Day_2_Oct_3_%28cropped%29.jpg",
      hasStory: true,
    },
    {
      id: "5",
      username: "Mark.Z",
      avatar: "https://www.technowize.com/wp-content/uploads/2019/09/most-influential-people-in-tech-mark.jpg",
      hasStory: true,
    },
    {
      id: "6",
      username: "Daniel Ek",
      avatar: "https://www.technowize.com/wp-content/uploads/2019/09/most-influential-people-in-tech-daniel.jpg",
      hasStory: true,
    },
    {
      id: "7",
      username: "Brian Chesky",
      avatar: "https://www.technowize.com/wp-content/uploads/2019/09/most-influential-people-in-tech-brian.jpg",
      hasStory: true,
    },
    {
      id: "8",
      username: "Susan.W",
      avatar: "https://www.technowize.com/wp-content/uploads/2019/09/most-influential-people-in-tech-Susan.jpg",
      hasStory: true,
    },
  ];

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storiesContainer}>
      {STORIES.map((story) => (
        <Story key={story.id} story={story} />
      ))}
    </ScrollView>
  );
};

export default StoriesSection;