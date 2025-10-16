import {MainLayout} from "../components/Layouts/MainLayout/MainLayout.tsx";
import {HeroSection}  from "../components/HomePage/HeroSection.tsx";
import {BigTextSection} from "../components/HomePage/BigTextSection.tsx";
import {AnnouncementTickerContainer, LeftToRightTicker, RightToLeftTicker} from "../components/HomePage/AnnouncementTicker.tsx";
import {HackathonRegistrationBanner} from "../components/HomePage/HackathonRegistrationBanner.tsx";
import {AboutUsSection} from "../components/HomePage/AboutUsSection.tsx";
import {EventsSection} from "../components/HomePage/EventsSection.tsx";
import BoardMembersSection from "../components/HomePage/BoardMembersSection.tsx";

export default function HomePage() {
    return (
        <MainLayout>
            <main>
                <HeroSection />
                <BigTextSection />
                <AnnouncementTickerContainer>
                    <LeftToRightTicker />
                    <HackathonRegistrationBanner />
                    <div className="mt-4">
                        <RightToLeftTicker />
                    </div>
                </AnnouncementTickerContainer>
                <AboutUsSection />
                <EventsSection />
                <BoardMembersSection />
            </main>
        </MainLayout>
    );
}
