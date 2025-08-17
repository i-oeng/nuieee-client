import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const HackathonRegistrationBanner = () => {
    const navigate = useNavigate();

    return (
        <section className="relative w-full bg-black text-white py-20 px-6 flex items-center justify-center">
            <div className="max-w-5xl text-center">
                {/* Big Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight"
                >
                    <span className="text-[#00629C]">hackathon</span>2.0
                </motion.h1>

                {/* Subtitle */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-8 space-y-3"
                >
                    <p className="text-lg md:text-xl lg:text-2xl tracking-[0.25em] uppercase font-semibold">
                        Nazarbayev University
                    </p>
                    <p className="text-lg md:text-xl lg:text-2xl tracking-[0.25em] uppercase font-semibold">
                        13 – 14 September, 2025
                    </p>
                </motion.div>

                {/* Register Button */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-12"
                >
                    <button
                        onClick={() => navigate("/hackathon/register/")}
                        className="px-10 py-4 rounded-2xl font-bold text-xl md:text-2xl bg-[#00629C] text-white shadow-lg hover:shadow-blue-500/50 hover:bg-[#007ac0] transition-all duration-300"
                    >
                        Register Now
                    </button>
                </motion.div>
            </div>
        </section>
    );
};
