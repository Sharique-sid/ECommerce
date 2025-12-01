import React from 'react';
import { Link } from 'react-router-dom';
import { FaCookieBite, FaChartBar, FaBullhorn, FaCog, FaCheckCircle } from 'react-icons/fa';

export default function Cookies() {
  const cookieTypes = [
    {
      icon: FaCog,
      title: 'Essential Cookies',
      desc: 'These cookies are necessary for the website to function. Without them, you\'d be staring at a blank screen wondering what happened to your life.',
      required: true
    },
    {
      icon: FaChartBar,
      title: 'Analytics Cookies',
      desc: 'Help us understand how you use our site. We promise not to judge when you spend 3 hours browsing without buying anything.',
      required: false
    },
    {
      icon: FaBullhorn,
      title: 'Marketing Cookies',
      desc: 'These follow you around the internet showing you ads for things you already bought. Yes, we know it\'s annoying. Sorry.',
      required: false
    }
  ];

  return (
    <div className="min-h-screen bg-[#212121] py-8">
      <div className="container">
        <div className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-emerald-500">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-300">Cookie Policy</span>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <FaCookieBite className="text-5xl text-emerald-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-4">Cookie Policy</h1>
            <p className="text-gray-400">Last updated: December 1, 2024</p>
            <p className="text-gray-500 text-sm mt-2">(Not the delicious kind, unfortunately)</p>
          </div>

          <div className="bg-[#2f2f2f] rounded-xl border border-[#424242] p-8 space-y-8">
            <section>
              <h2 className="text-xl font-bold text-white mb-4">What Are Cookies?</h2>
              <p className="text-gray-400 leading-relaxed">
                No, we're not talking about those delicious baked goods (though we wish we were). 
                Cookies are small text files that websites store on your device. They're like tiny 
                digital Post-it notes that help us remember things about you - like your login info, 
                preferences, and the fact that you've been eyeing that product for weeks.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">Why We Use Cookies</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                We use cookies because we have the memory of a goldfish without them. Specifically, they help us:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                <li>Keep you logged in (so you don't have to remember yet another password)</li>
                <li>Remember what's in your cart (we know you'll be back for those items)</li>
                <li>Understand what you like (to show you relevant products, not random stuff)</li>
                <li>Make our website work properly (kind of important, really)</li>
                <li>Show you ads that make you say "How did they know?!" (it's not magic, it's cookies)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">Types of Cookies We Use</h2>
              <div className="space-y-4">
                {cookieTypes.map((cookie, index) => (
                  <div key={index} className="bg-[#3a3a3a] rounded-xl p-6 border border-[#424242]">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <cookie.icon className="text-xl text-emerald-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-bold text-white">{cookie.title}</h3>
                          {cookie.required && (
                            <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full">Required</span>
                          )}
                        </div>
                        <p className="text-gray-400">{cookie.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">Third-Party Cookies</h2>
              <p className="text-gray-400 leading-relaxed">
                Some cookies come from our partners (payment providers, analytics tools, social media). 
                They're like guests at a party - we invited them, but we can't control exactly what they do. 
                They have their own privacy policies, and we suggest you read them if you have trouble 
                sleeping (very effective).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">Managing Cookies</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                You have control over your cookies (if only we could say the same about actual cookies). Here's how:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                <li><strong className="text-white">Browser settings:</strong> Most browsers let you block or delete cookies</li>
                <li><strong className="text-white">Our cookie banner:</strong> Accept or reject non-essential cookies when you visit</li>
                <li><strong className="text-white">Opt-out links:</strong> Many advertising cookies can be opted out of</li>
              </ul>
              <p className="text-gray-400 leading-relaxed mt-4">
                Warning: Blocking all cookies might make our site work about as well as a chocolate teapot. 
                Essential cookies are... well, essential. Who would've guessed?
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">Cookie Lifespan</h2>
              <p className="text-gray-400 leading-relaxed">
                Some cookies are temporary (session cookies) - they disappear when you close your browser 
                like a magician's dove. Others stick around longer (persistent cookies) - like that one 
                party guest who doesn't get the hint. Most of our persistent cookies last between 30 days 
                and 1 year.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">Updates to This Policy</h2>
              <p className="text-gray-400 leading-relaxed">
                We may update this cookie policy occasionally (whenever the lawyers get bored). 
                We'll let you know about significant changes, but checking back here from time to time 
                wouldn't hurt. Think of it as light reading material.
              </p>
            </section>

            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6 mt-8">
              <div className="flex items-center gap-3 justify-center">
                <FaCheckCircle className="text-emerald-500 text-xl" />
                <p className="text-gray-300">
                  By continuing to use our website, you consent to our use of cookies. 
                  Now go treat yourself to some real cookies - you've earned it!
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link to="/contact" className="text-emerald-500 hover:text-emerald-400">
              Questions about cookies? We're here to help (no baking advice though)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
