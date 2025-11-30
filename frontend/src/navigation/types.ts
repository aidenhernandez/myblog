import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

/**
 * Authentication Stack Navigator
 * Handles login and registration flows
 */
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

/**
 * Home Stack Navigator
 * Handles feed, post details, and user profiles
 */
export type HomeStackParamList = {
  Feed: undefined;
  PostDetail: { postId: number };
  UserProfile: { userId: number };
};

/**
 * Explore Stack Navigator
 * Handles search, tags, and discovery
 */
export type ExploreStackParamList = {
  Search: undefined;
  TagPosts: { tagId: number; tagName: string };
};

/**
 * Create Stack Navigator
 * Handles post creation flow
 */
export type CreateStackParamList = {
  CreatePost: undefined;
  PostPreview: { content: string; title: string };
};

/**
 * Notifications Stack Navigator
 * Handles notifications list and details
 */
export type NotificationsStackParamList = {
  NotificationsList: undefined;
};

/**
 * Profile Stack Navigator
 * Handles current user's profile, settings, and edit flows
 */
export type ProfileStackParamList = {
  MyProfile: undefined;
  EditProfile: undefined;
  Settings: undefined;
};

/**
 * Main Tab Navigator
 * Bottom tabs for primary app navigation
 */
export type MainTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  ExploreTab: NavigatorScreenParams<ExploreStackParamList>;
  CreateTab: NavigatorScreenParams<CreateStackParamList>;
  NotificationsTab: NavigatorScreenParams<NotificationsStackParamList>;
  ProfileTab: NavigatorScreenParams<ProfileStackParamList>;
};

/**
 * Root Navigator
 * Switches between Auth and Main flows
 */
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
};

// Screen props type helpers for type-safe navigation
export type AuthStackScreenProps<T extends keyof AuthStackParamList> = NativeStackScreenProps<
  AuthStackParamList,
  T
>;

export type HomeStackScreenProps<T extends keyof HomeStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, T>,
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, 'HomeTab'>,
    NativeStackScreenProps<RootStackParamList>
  >
>;

export type ExploreStackScreenProps<T extends keyof ExploreStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<ExploreStackParamList, T>,
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, 'ExploreTab'>,
    NativeStackScreenProps<RootStackParamList>
  >
>;

export type CreateStackScreenProps<T extends keyof CreateStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<CreateStackParamList, T>,
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, 'CreateTab'>,
    NativeStackScreenProps<RootStackParamList>
  >
>;

export type NotificationsStackScreenProps<
  T extends keyof NotificationsStackParamList
> = CompositeScreenProps<
  NativeStackScreenProps<NotificationsStackParamList, T>,
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, 'NotificationsTab'>,
    NativeStackScreenProps<RootStackParamList>
  >
>;

export type ProfileStackScreenProps<T extends keyof ProfileStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<ProfileStackParamList, T>,
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, 'ProfileTab'>,
    NativeStackScreenProps<RootStackParamList>
  >
>;

// Declare global type for useNavigation hook
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
