import React from 'react';
import { Link } from 'react-router-dom';
import { FaScroll, FaGavel, FaExclamationTriangle, FaLaugh } from 'react-icons/fa';

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#212121] py-8">
      <div className="container">
        <div className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-emerald-500">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-300">Terms & Conditions</span>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <FaScroll className="text-5xl text-emerald-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-4">Terms & Conditions</h1>
            <p className="text-gray-400">Last updated: December 1, 2024</p>
            <p className="text-gray-500 text-sm mt-2">(We promise this is more entertaining than most legal documents)</p>
          </div>

          <div className="bg-[#2f2f2f] rounded-xl border border-[#424242] p-8 space-y-8">
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FaGavel className="text-emerald-500" /> 1. Acceptance of Terms
              </h2>
              <p className="text-gray-400 leading-relaxed">
                By using ShopHub, you acknowledge that you have read these terms (or at least pretended to, like everyone else). 
                If you don't agree with these terms, you're welcome to go shopping in the real world where you have to wear pants. 
                We'll wait here for you to come back.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">2. User Accounts</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                When you create an account, you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                <li>Provide accurate information (your fake name doesn't count)</li>
                <li>Keep your password secret (no, "password123" is not secure)</li>
                <li>Not share your account (unless it's with your cat who has excellent taste)</li>
                <li>Accept responsibility for all activities under your account (yes, even that 3 AM impulse purchase)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FaExclamationTriangle className="text-yellow-500" /> 3. Prohibited Activities
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">You shall not:</p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                <li>Use our platform for any illegal activities (duh)</li>
                <li>Attempt to hack our systems (we have a very grumpy IT guy)</li>
                <li>Post fake reviews (your mom's honest opinion doesn't count as 5 stars)</li>
                <li>Buy things you can't afford (that's just life advice, really)</li>
                <li>Send us complaints about your own poor decisions (we warned you about that neon green tracksuit)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">4. Pricing & Payments</h2>
              <p className="text-gray-400 leading-relaxed">
                All prices are in INR and include applicable taxes (because we're not monsters). 
                We reserve the right to change prices without notice, but we promise not to do it while 
                you're mid-checkout like some medieval toll bridge operator. Payment is due at the time 
                of purchase - IOUs, monopoly money, and cryptocurrency your cousin made up are not accepted.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">5. Shipping & Delivery</h2>
              <p className="text-gray-400 leading-relaxed">
                We'll do our best to deliver on time, but we can't control traffic, weather, or the 
                delivery person's sudden urge to pet every dog they see. Estimated delivery times are 
                just that - estimates. They're not legally binding prophecies from an oracle.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FaLaugh className="text-emerald-500" /> 6. Limitation of Liability
              </h2>
              <p className="text-gray-400 leading-relaxed">
                We are not liable for: disappointment when you realize the "one size fits all" really 
                doesn't fit all, buyer's remorse, your spouse's reaction to another package, the 
                existential crisis caused by having too many choices, or any injuries sustained while 
                racing to the door when the delivery arrives.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">7. Intellectual Property</h2>
              <p className="text-gray-400 leading-relaxed">
                All content on ShopHub is ours (or we have permission to use it). Please don't copy, 
                reproduce, or use our content without permission. We spent a lot of time making this 
                look nice, and it would really hurt our feelings.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">8. Dispute Resolution</h2>
              <p className="text-gray-400 leading-relaxed">
                In case of disputes, we prefer to resolve things amicably over chai. If that doesn't work, 
                disputes will be settled under Indian law in Delhi courts. We promise not to challenge 
                you to trial by combat (that's so medieval).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">9. Changes to Terms</h2>
              <p className="text-gray-400 leading-relaxed">
                We may update these terms occasionally. We'll notify you via email, but let's be honest - 
                you'll probably ignore that email just like you ignored this document until you needed 
                to complain about something. That's okay, we still love you.
              </p>
            </section>

            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6 mt-8">
              <p className="text-gray-300 text-center">
                By continuing to use ShopHub, you confirm that you've read these terms, understood them, 
                or at least scrolled to the bottom (we see you). Thanks for being a valued customer!
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link to="/contact" className="text-emerald-500 hover:text-emerald-400">
              Questions about these terms? Contact our legal team (they're fun at parties)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
