"use client"
import ContactForm from '@/components/pages-layout/Contact/ContactForm';  
import CustomBanner from "@/components/pages-layout/Job/CustomBanner";
import Location from '@/components/pages-layout/Contact/Location';

export default function ContactPage() {
    return (
        <main className="min-h-screen pt-20">
            <ContactForm />
            <CustomBanner
                text="Recruitment-4u is here for you and ready to answer all your questions."
                variant="primary"
            />
            <Location />
        </main>
    );
}