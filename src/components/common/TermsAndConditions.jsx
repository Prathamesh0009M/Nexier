import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="p-8 max-w-3xl mx-auto text-richblack-50">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      <p>
        Welcome to The Nexier. By accessing or using our platform, you agree to comply with and be bound by these terms and
        conditions. Please read them carefully.
      </p>

      {/* Main Content */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold mt-4">1. Acceptance of Terms</h2>
        <p>
          By using this platform, you acknowledge that you have read, understood, and agree to be bound by these terms. We reserve the right to
          modify these terms at any time, with changes taking effect upon posting. It is your responsibility to review these terms periodically.
        </p>

        <h2 className="text-xl font-semibold mt-4">2. Use of Service</h2>
        <p>
          Our platform is intended to facilitate the buying and selling of campus-related items among students. Users are expected to act
          responsibly, treat others with respect, and comply with all relevant laws and university policies.
        </p>
        <p>
          You are responsible for any content or items you post, including ensuring that items listed for sale meet legal and university requirements.
        </p>

        <h2 className="text-xl font-semibold mt-4">3. Buy at Your Own Responsibility</h2>
        <p>
          All purchases made through our platform are at your own risk. We do not guarantee the quality, condition, or legitimacy of the items listed.
          Buyers are responsible for ensuring they have adequately inspected and confirmed any item before completing a transaction.
        </p>

        <h2 className="text-xl font-semibold mt-4">4. Privacy Policy</h2>
        <p>
          We respect your privacy and are committed to protecting your personal information. Please refer to our Privacy Policy for details on how we
          collect, use, and safeguard your data.
        </p>

        <h2 className="text-xl font-semibold mt-4">5. Limitation of Liability</h2>
        <p>
          We are not liable for any direct, indirect, incidental, or consequential damages arising from or related to the use of our services. Our
          platform is provided on an "as-is" basis, and we make no warranties of any kind, express or implied.
        </p>

        <h2 className="text-xl font-semibold mt-4">6. Termination</h2>
        <p>
          We reserve the right to terminate or suspend your access to our platform at our discretion, without notice, if we believe you have violated
          these terms or engaged in any activity that could harm the platform or other users.
        </p>

        <h2 className="text-xl font-semibold mt-4">7. Governing Law</h2>
        <p>
          These terms are governed by and construed in accordance with the laws of our jurisdiction. By using our services, you agree to submit to
          the exclusive jurisdiction of our courts for any disputes arising from or related to these terms.
        </p>

        <p className="mt-8">
          By using this platform, you accept these terms in full. If you do not agree with any part of these terms, you must discontinue using our
          services immediately.
        </p>
      </section>
    </div>
  );
};

export default TermsAndConditions;
