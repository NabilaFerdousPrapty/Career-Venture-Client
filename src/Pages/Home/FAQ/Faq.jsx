import React from 'react';

const Faq = () => {
	return (
		<div>
			<section className="border border-amber-300 rounded-2xl  ">
				<div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
					<h2 className="text-2xl font-semibold sm:text-4xl text-primary">Frequently Asked Questions</h2>
					<p className="mt-4 mb-8 text-primary">Find answers to common questions about how Career Venture can help you grow your skills and land your dream job.</p>
					<div className="space-y-4">
						<details className="w-full border rounded-lg">
							<summary className="px-4 py-6 focus:outline-none  text-primary">How can Career Venture help in my job search?</summary>
							<p className="px-4 py-6 pt-0 ml-4 -mt-4 text-secondary">Career Venture provides curated job listings, expert mentorship, and resources to help you develop the skills necessary for your career growth.Here

							</p>
						</details>
						<details className="w-full border rounded-lg">
							<summary className="px-4 py-6 focus:outline-none  text-primary">What types of courses and resources are available?</summary>
							<p className="px-4 py-6 pt-0 ml-4 -mt-4 text-secondary">We offer a variety of boot camps, webinars, and learning materials covering topics like coding, design, project management, and more, tailored for different career paths.</p>
						</details>
						<details className="w-full border rounded-lg">
							<summary className="px-4 py-6 focus:outline-none  text-primary">Can I get personalized career guidance?</summary>
							<p className="px-4 py-6 pt-0 ml-4 -mt-4 text-secondary">Yes! Career Venture connects you with industry professionals who provide one-on-one mentoring to help you navigate your career journey.</p>
						</details>
					</div>
				</div>
			</section>

		</div>
	);
};

export default Faq;