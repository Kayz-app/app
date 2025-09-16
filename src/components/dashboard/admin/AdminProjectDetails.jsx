import React, { useState, useEffect } from 'react';

// --- INLINED ICONS & HELPERS --- //
const ArrowLeftIcon = (props) => ( <svg {...props} xmlns="http://www.w.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg> );
const SparklesIcon = (props) => ( <svg {...props} xmlns="http://www.w.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3L9.5 8.5L4 11L9.5 13.5L12 19L14.5 13.5L20 11L14.5 8.5L12 3Z"/><path d="M3 21L4.5 16.5L9 15L4.5 13.5L3 9"/><path d="M21 21L19.5 16.5L15 15L19.5 13.5L21 9"/></svg> );
const PaperclipIcon = (props) => ( <svg {...props} xmlns="http://www.w.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg> );
const formatCurrency = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
const callAIAPI = async () => "AI response placeholder."; // Placeholder for AI API call
// --- END --- //

const AdminProjectDetails = ({ project, onUpdateProjectStatus, onBack }) => {
    const [mainImage, setMainImage] = useState('');
    const [summary, setSummary] = useState({ text: '', isLoading: false, error: '' });

    useEffect(() => {
        if (project && project.images && project.images.length > 0) {
            setMainImage(project.images[0]);
        }
    }, [project]);

    if (!project) {
        return (
             <div>
                <button onClick={onBack} className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-6">
                    <ArrowLeftIcon className="w-4 h-4 mr-2" />
                    Back to Project Approvals
                </button>
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                    <p>Loading project details...</p>
                </div>
            </div>
        );
    }

    const handleApprove = () => {
        onUpdateProjectStatus(project.id, 'active');
        onBack();
    };
    
    const handleReject = () => {
        onUpdateProjectStatus(project.id, 'rejected');
        onBack();
    };
    
    const generateSummary = async () => {
        setSummary({ text: '', isLoading: true, error: '' });
        // AI logic would go here
        setTimeout(() => setSummary({ text: 'AI-generated summary about the project risks and opportunities.', isLoading: false, error: '' }), 2000);
    };

    return (
        <div>
            <button onClick={onBack} className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-6">
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Back to Project Approvals
            </button>
            <div className="border-b pb-4 mb-6 flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">{project.title}</h2>
                    <p className="text-md text-gray-500">Submitted by: <span className="font-semibold">{project.developerName}</span></p>
                </div>
                <button onClick={generateSummary} disabled={summary.isLoading} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                     <SparklesIcon className="w-5 h-5 mr-2" />
                    {summary.isLoading ? 'Analyzing...' : 'Generate Approval Summary'}
                </button>
            </div>
            
            { (summary.isLoading || summary.text || summary.error) && (
                <div className="mb-8 p-6 bg-indigo-50 rounded-lg border border-indigo-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">AI Analysis</h3>
                     {summary.isLoading && <p>Generating analysis...</p>}
                     {summary.error && <p className="text-red-600">{summary.error}</p>}
                     {summary.text && <p className="prose prose-sm max-w-none text-gray-800">{summary.text}</p>}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    {mainImage && <img src={mainImage} alt="Main project view" className="w-full h-80 object-cover rounded-lg shadow-md mb-4"/>}
                    <div className="flex space-x-2">
                        {project.images && project.images.map((img, index) => (
                            <img key={index} src={img} alt={`Thumbnail ${index + 1}`} className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${mainImage === img ? 'border-indigo-500' : 'border-transparent'}`} onClick={() => setMainImage(img)} />
                        ))}
                    </div>
                </div>
                <div>
                    <div className="bg-gray-50 p-6 rounded-lg border">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Financial Details</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm"><span>Funding Goal:</span><span className="font-bold">{formatCurrency(project.fundingGoal)}</span></div>
                            <div className="flex justify-between text-sm"><span>Proposed APY:</span><span className="font-bold text-green-600">{project.apy}%</span></div>
                            <div className="flex justify-between text-sm"><span>Term:</span><span className="font-bold">{project.term} Months</span></div>
                        </div>
                    </div>
                    <div className="mt-8">
                         <h3 className="text-xl font-semibold text-gray-800 mb-4">Submitted Documents</h3>
                         <a href="#" className="flex items-center p-3 bg-white border rounded-md hover:bg-gray-50">
                            <PaperclipIcon className="w-5 h-5 mr-3 text-gray-500"/>
                            <span className="font-medium text-indigo-600">Project_Documents.zip</span>
                            <span className="ml-auto text-sm text-gray-500">Download</span>
                         </a>
                    </div>
                </div>
            </div>

            <div className="border-t mt-8 pt-6 flex justify-end space-x-4">
                {project.status === 'pending' ? (
                    <>
                        <button onClick={handleReject} className="bg-red-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-red-700">Reject</button>
                        <button onClick={handleApprove} className="bg-green-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-700">Approve</button>
                    </>
                ) : (
                    <button className="bg-yellow-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-yellow-600">Flag for Review</button>
                )}
            </div>
        </div>
    );
};

export default AdminProjectDetails;

