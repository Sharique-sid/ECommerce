import React from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaEye, FaUserSecret, FaDatabase, FaLock } from 'react-icons/fa';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#212121] py-8">
      <div className="container">
        <div className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-emerald-500">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-300">Privacy Policy</span>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <FaShieldAlt className="text-5xl text-emerald-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-gray-400">Last updated: December 1, 2024</p>
            <p className="text-gray-500 text-sm mt-2">(Where we explain what we do with your secrets)</p>
          </div>

          <div className="bg-[#2f2f2f] rounded-xl border border-[#424242] p-8 space-y-8">
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FaDatabase className="text-emerald-500" /> 1. Information We Collect
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">We collect information that you voluntarily provide, including:</p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                <li><strong className="text-white">Personal details:</strong> Name, email, phone number (promise we won't spam you at 3 AM)</li>
                <li><strong className="text-white">Payment info:</strong> Card details (securely encrypted, not written on sticky notes)</li>
                <li><strong className="text-white">Address:</strong> So we know where to send your stuff (not to stalk you)</li>
                <li><strong className="text-white">Shopping habits:</strong> Yes, we know you looked at that item 47 times before buying</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FaEye className="text-emerald-500" /> 2. How We Use Your Information
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">We use your data to:</p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                <li>Process your orders (obviously)</li>
                <li>Send you updates about your delivery (so you can refresh tracking 100 times)</li>
                <li>Recommend products you might like (yes, we're basically a mind reader)</li>
                <li>Improve our services (we're always trying to be better humans... er, websites)</li>
                <li>Send promotional emails (which you'll promptly ignore or unsubscribe from, and that's okay)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FaUserSecret className="text-emerald-500" /> 3. What We DON'T Do
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">We solemnly swear we don't:</p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                <li>Sell your data to shady third parties (we're not that kind of website)</li>
                <li>Read your texts or listen to your conversations (we're not that talented)</li>
                <li>Share your embarrassing purchases with anyone (your secret obsession with garden gnomes is safe)</li>
                <li>Judge your 2 AM shopping choices (we've all been there)</li>
                <li>Tell your family how much you actually spent (that's between you and your bank)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FaLock className="text-emerald-500" /> 4. How We Protect Your Data
              </h2>
              <p className="text-gray-400 leading-relaxed">
                We use industry-standard encryption to protect your data. Think of it like a digital fortress 
                guarded by dragons... or at least really good SSL certificates. We regularly update our 
                security measures because hackers don't take holidays (unfortunately neither does our IT team).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">5. Cookies</h2>
              <p className="text-gray-400 leading-relaxed">
                We use cookies, but sadly not the chocolate chip kind. These digital cookies help us 
                remember who you are and what you like. You can disable them, but then we'll forget 
                you like a goldfish forgets its owner. For more delicious details, check our{' '}
                <Link to="/cookies" className="text-emerald-500 hover:text-emerald-400">Cookie Policy</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">6. Your Rights</h2>
              <p className="text-gray-400 leading-relaxed mb-4">You have the right to:</p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                <li><strong className="text-white">Access:</strong> See what data we have (spoiler: it's your shopping history)</li>
                <li><strong className="text-white">Correct:</strong> Fix any wrong information (yes, you can change that typo in your name)</li>
                <li><strong className="text-white">Delete:</strong> Request we delete your data (though we'll miss you)</li>
                <li><strong className="text-white">Opt-out:</strong> Say no to marketing emails (no hard feelings)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">7. Third-Party Services</h2>
              <p className="text-gray-400 leading-relaxed">
                We work with third-party services for payments, shipping, and analytics. They have their 
                own privacy policies, and we make sure they're not weirdos before partnering with them. 
                Think of it as us doing background checks on your behalf.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">8. Children's Privacy</h2>
              <p className="text-gray-400 leading-relaxed">
                Our services are not intended for users under 18. If you're a kid reading this, please 
                get your parent's permission (and tell them they have great taste in websites).
              </p>
            </section>

            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6 mt-8">
              <p className="text-gray-300 text-center">
                We take your privacy seriously (unlike your nosy neighbors). If you have questions, 
                concerns, or just want to chat about data protection, reach out to us!
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link to="/contact" className="text-emerald-500 hover:text-emerald-400">
              Questions? Our privacy team is here to help (they're very trustworthy)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
