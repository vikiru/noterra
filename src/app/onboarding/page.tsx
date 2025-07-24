// import { useRouter } from 'next/navigation';
//
// // TODO: finish gemini prompt page (save notes and cards to db - toc update later)
// // TODO: once this is done - check if any other backend needs work. if no, work on note zustand and server handling
// // TODO: design notes page and each note is a card with brief metadata, flashcard count, etc. opens in new page
// // TODO: note page shows up as preview, similar to medium articles single col layout, with edit, export as menus on top right
// // TODO: tab to see flashcard as well + share / privacy settings
import OnboardingForm from '@/components/forms/OnboardingForm';
import { type UserState, useUserStore } from '@/store/user';

// TODO: fix this, userouter only works in client component
export default function OnboardingPage() {
    const _user = useUserStore((state: UserState) => state.user);
    // // const router = useRouter();
    // if (user) {
    //     router.push(DASHBOARD_ROUTE);
    // } else {
    //     return <OnboardingForm />;
    // }
    return <OnboardingForm />;
}
