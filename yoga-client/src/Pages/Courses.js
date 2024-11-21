import React from 'react';

function Courses() {
    return (
        <div className="courses-container">
            <h1>Our Yoga Courses</h1>
            <p>Explore a variety of yoga courses designed for all levels of experience, from beginner to advanced.</p>
            {/* Add content like course cards or lists */}
            <div className="course-list">
                <div className="course-card">
                    <h2>Beginner Yoga</h2>
                    <p>Perfect for newcomers to yoga, focusing on foundational poses and techniques.</p>
                </div>
                <div className="course-card">
                    <h2>Intermediate Yoga</h2>
                    <p>Enhance your practice with more challenging poses and sequences.</p>
                </div>
                <div className="course-card">
                    <h2>Advanced Yoga</h2>
                    <p>Master advanced asanas and deepen your connection to the practice.</p>
                </div>
            </div>
        </div>
    );
}

export default Courses;
