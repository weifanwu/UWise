<div align="center">
  <img src="front-end-web/public/images/uwise2.png" alt="UWise logo" width="120" />
  <h1>UWise</h1>
  <p><strong>Academic support and campus guidance for Chinese-speaking international students.</strong></p>
</div>

## What is UWise?

UWise is a student-focused platform created for the Chinese-speaking international student community at the University of Washington. It brings together the academic and practical information that students would otherwise have to find across university websites, group chats, social media, and word of mouth.

The goal is simple: help students make better academic decisions, adapt to life abroad faster, and spend less time searching for reliable, locally relevant information.

## What the platform offers

- **Academic support** — course-specific tutoring, live Q&A, lesson recordings, and practice materials.
- **Course insights** — student reviews, ratings, course descriptions, and grade-distribution context.
- **Campus guides** — practical resources for housing, major applications, immigration documents, insurance, transportation, and everyday life.
- **News and opportunities** — curated campus events, student-club activities, career fairs, research opportunities, and internships.
- **Internal operations tools** — dedicated workflows that enable the Content Team to publish resources and staff members to manage course access and moderate student reviews.

## Business model

UWise combines free information services with paid academic support. Campus guides and curated updates help the platform earn trust and become useful throughout a student's university journey, while tutoring packages and premium course resources address urgent, outcome-driven needs.

The initial focus on one university and one student community makes the product more relevant than a generic education marketplace: language, local knowledge, and peer trust are central to the experience.

## Built for both students and internal teams

UWise was designed as an end-to-end product, not only a public-facing website. Alongside the student experience, the repository includes two employee-facing platforms:

- **Content operations platform** — used by the Content Team to publish campus guides, news, events, and course recordings, as well as manage course access codes.
- **Course-review moderation platform** — used by staff members to audit student submissions, approve appropriate reviews, and remove offensive, illegal, or misleading content.

## Cross-functional collaboration

UWise was more than a software project. It brought together an Engineering Team responsible for the product and internal systems, and a Content Team responsible for keeping the platform useful, relevant, and current.

The internal tools connected these functions through repeatable workflows: content could be prepared and published by the Content Team, while community submissions could be reviewed before appearing on the student platform. This cross-functional operating model allowed the team to manage both the technology and the information quality behind the product.

## Technical overview

The repository contains three React applications: the student platform, an internal content and course-operations platform, and a course-review moderation platform. The product uses REST APIs for authentication, course access, reviews, and content delivery, with Google and WeChat sign-in, activation-code-based access, and a Leaflet/OpenStreetMap campus resource map. The backend is maintained separately and is not included in this repository.

**Core technologies:** React, Redux, React Router, Ant Design, Material UI, and Leaflet.
