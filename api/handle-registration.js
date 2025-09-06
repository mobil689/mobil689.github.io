// api/handle-registration.js
import { createClient } from '@sanity/client';

// Initialize the Sanity client
const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    apiVersion: '2021-10-21',
    token: process.env.SANITY_WRITE_TOKEN, // Use a write token for creating documents
    useCdn: false, // `false` ensures fresh data
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { name, email, studentId, yearOfStudy, reasonToJoin } = req.body;

    // Basic validation
    if (!name || !email || !studentId || !yearOfStudy || !reasonToJoin) {
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        // Create a new document in Sanity
        const doc = {
            _type: 'applicant',
            name,
            email,
            studentId,
            yearOfStudy: Number(yearOfStudy),
            reasonToJoin,
            status: 'pending', // Default status
        };

        const result = await client.create(doc);
        res.status(200).json({ success: true, message: 'Application submitted successfully!', data: result });
    } catch (error) {
        console.error('Error creating applicant in Sanity:', error);
        res.status(500).json({ success: false, message: 'Error submitting application.' });
    }
}
