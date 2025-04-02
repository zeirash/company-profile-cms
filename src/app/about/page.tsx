export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">About Us</h1>

      <div className="max-w-3xl mx-auto">
        <div className="prose prose-lg">
          <p className="text-xl mb-8">
            We are a forward-thinking company dedicated to providing innovative solutions
            for businesses worldwide. Our mission is to help companies thrive in the
            digital age through cutting-edge technology and exceptional service.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Our Story</h2>
          <p className="mb-6">
            Founded in 2024, we've grown from a small startup to a global leader in
            business solutions. Our journey has been marked by continuous innovation
            and a commitment to customer success.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Our Values</h2>
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-2">Innovation and Creativity</li>
            <li className="mb-2">Customer Success</li>
            <li className="mb-2">Integrity and Transparency</li>
            <li className="mb-2">Continuous Improvement</li>
            <li className="mb-2">Team Collaboration</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Our Team</h2>
          <p className="mb-6">
            Our diverse team of experts brings together years of experience in
            technology, business, and customer service. We're passionate about
            delivering the best solutions for our clients.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Our Vision</h2>
          <p className="mb-6">
            We envision a future where businesses of all sizes can leverage
            technology to achieve their full potential. Through our products and
            services, we're making this vision a reality.
          </p>
        </div>
      </div>
    </div>
  )
}
