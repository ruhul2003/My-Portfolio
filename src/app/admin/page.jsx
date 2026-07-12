"use client";

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaEdit, FaPlus, FaSignOutAlt, FaImage, FaTimes, FaGlobe, FaBriefcase, FaAward, FaCertificate } from 'react-icons/fa';

function AdminDashboardContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    
    // Tab State: 'projects', 'education', or 'certifications'
    const [activeTab, setActiveTab] = useState('projects');
    
    // List States
    const [projects, setProjects] = useState([]);
    const [educationItems, setEducationItems] = useState([]);
    const [certificationItems, setCertificationItems] = useState([]);
    
    // Single Modal configuration
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState('project'); // 'project', 'education', or 'certification'
    const [editingId, setEditingId] = useState(null);
    const [formLoading, setFormLoading] = useState(false);
    const [formError, setFormError] = useState('');

    // Project Form Fields State
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const [technologies, setTechnologies] = useState([]);
    const [techInput, setTechInput] = useState('');
    const [images, setImages] = useState([]); // base64 strings

    // Education/Experience Form Fields State
    const [eduYear, setEduYear] = useState('');
    const [eduCompany, setEduCompany] = useState('');
    const [eduRole, setEduRole] = useState('');
    const [eduDescription, setEduDescription] = useState('');
    const [eduOrder, setEduOrder] = useState(0);

    // Certifications/Awards Form Fields State
    const [certTitle, setCertTitle] = useState('');
    const [certIssuer, setCertIssuer] = useState('');
    const [certYear, setCertYear] = useState('');
    const [certLink, setCertLink] = useState('');
    const [certType, setCertType] = useState('certification');
    const [certDescription, setCertDescription] = useState('');
    const [certOrder, setCertOrder] = useState(0);

    const fileInputRef = useRef(null);

    // Verify auth status & Load initial data
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch('/api/auth/status');
                const data = await res.json();
                if (!data.authenticated) {
                    router.push('/admin/login');
                } else {
                    setAuthenticated(true);
                    // Fetch all lists
                    await Promise.all([
                        fetchProjects(), 
                        fetchEducation(),
                        fetchCertifications()
                    ]);
                }
            } catch (err) {
                router.push('/admin/login');
            }
        };
        checkAuth();
    }, [router]);

    // Handle initial tab / query params for edit
    useEffect(() => {
        const tabParam = searchParams.get('tab');
        if (tabParam === 'education' || tabParam === 'certifications') {
            setActiveTab(tabParam);
        } else {
            setActiveTab('projects');
        }
    }, [searchParams]);

    // Automatically trigger edit modal if ID is in URL query params
    useEffect(() => {
        const editId = searchParams.get('edit');
        if (editId) {
            if (activeTab === 'projects' && projects.length > 0) {
                const proj = projects.find(p => p._id === editId);
                if (proj) openProjectEditModal(proj);
            } else if (activeTab === 'education' && educationItems.length > 0) {
                const edu = educationItems.find(e => e._id === editId);
                if (edu) openEducationEditModal(edu);
            } else if (activeTab === 'certifications' && certificationItems.length > 0) {
                const cert = certificationItems.find(c => c._id === editId);
                if (cert) openCertificationEditModal(cert);
            }
        }
    }, [searchParams, projects, educationItems, certificationItems, activeTab]);

    // Fetch lists
    const fetchProjects = async () => {
        try {
            const res = await fetch('/api/projects');
            const data = await res.json();
            if (data.success) setProjects(data.data);
        } catch (err) {
            console.error("Error fetching projects:", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchEducation = async () => {
        try {
            const res = await fetch('/api/education');
            const data = await res.json();
            if (data.success) setEducationItems(data.data);
        } catch (err) {
            console.error("Error fetching education:", err);
        }
    };

    const fetchCertifications = async () => {
        try {
            const res = await fetch('/api/certifications');
            const data = await res.json();
            if (data.success) setCertificationItems(data.data);
        } catch (err) {
            console.error("Error fetching certifications:", err);
        }
    };

    const handleLogout = async () => {
        try {
            const res = await fetch('/api/auth/logout', { method: 'POST' });
            const data = await res.json();
            if (data.success) {
                router.push('/');
                router.refresh();
            }
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    // DELETIONS
    const handleDeleteProject = async (id) => {
        if (!confirm("Are you sure you want to delete this project?")) return;
        try {
            const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.success) {
                setProjects(projects.filter(p => p._id !== id));
            } else {
                alert(data.message || "Failed to delete project");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteEducation = async (id) => {
        if (!confirm("Are you sure you want to delete this timeline entry?")) return;
        try {
            const res = await fetch(`/api/education/${id}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.success) {
                setEducationItems(educationItems.filter(e => e._id !== id));
            } else {
                alert(data.message || "Failed to delete entry");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteCertification = async (id) => {
        if (!confirm("Are you sure you want to delete this certification/award?")) return;
        try {
            const res = await fetch(`/api/certifications/${id}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.success) {
                setCertificationItems(certificationItems.filter(c => c._id !== id));
            } else {
                alert(data.message || "Failed to delete credential");
            }
        } catch (err) {
            console.error(err);
        }
    };

    // IMAGE COMPRESSION (For projects)
    const compressImage = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 1000;
                    let width = img.width;
                    let height = img.height;

                    if (width > MAX_WIDTH) {
                        height = Math.round((height * MAX_WIDTH) / width);
                        width = MAX_WIDTH;
                    }

                    canvas.width = width;
                    canvas.height = height;

                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
                    resolve(compressedBase64);
                };
                img.onerror = (err) => reject(err);
            };
            reader.onerror = (err) => reject(err);
        });
    };

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (images.length + files.length > 5) {
            setFormError("You can upload a maximum of 5 images.");
            return;
        }

        setFormError('');
        const compressedList = [];
        for (let file of files) {
            try {
                const compressed = await compressImage(file);
                // Push as object with url and empty title initially
                compressedList.push({ url: compressed, title: '' });
            } catch (err) {
                setFormError("Failed to process one or more images.");
            }
        }
        setImages(prev => [...prev, ...compressedList]);
    };

    const updateImageTitle = (index, titleText) => {
        setImages(prev => prev.map((img, idx) => idx === index ? { ...img, title: titleText } : img));
    };

    const removeImage = (index) => {
        setImages(prev => prev.filter((_, idx) => idx !== index));
    };

    // PROJECT TAGS
    const handleAddTech = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const tag = techInput.trim().replace(/,/g, '');
            if (tag && !technologies.includes(tag)) {
                setTechnologies([...technologies, tag]);
            }
            setTechInput('');
        }
    };

    const removeTech = (index) => {
        setTechnologies(prev => prev.filter((_, idx) => idx !== index));
    };

    // MODAL OPENERS
    const openProjectAddModal = () => {
        setModalType('project');
        setEditingId(null);
        setTitle('');
        setDescription('');
        setLink('');
        setTechnologies([]);
        setImages([]);
        setFormError('');
        setModalOpen(true);
    };

    const openProjectEditModal = (project) => {
        setModalType('project');
        setEditingId(project._id);
        setTitle(project.title);
        setDescription(project.description);
        setLink(project.link || '');
        setTechnologies(project.technologies || []);
        setImages(project.images || []);
        setFormError('');
        setModalOpen(true);
    };

    const openEducationAddModal = () => {
        setModalType('education');
        setEditingId(null);
        setEduYear('');
        setEduCompany('');
        setEduRole('');
        setEduDescription('');
        setEduOrder(educationItems.length + 1);
        setFormError('');
        setModalOpen(true);
    };

    const openEducationEditModal = (edu) => {
        setModalType('education');
        setEditingId(edu._id);
        setEduYear(edu.year);
        setEduCompany(edu.company);
        setEduRole(edu.role);
        setEduDescription(edu.description);
        setEduOrder(edu.order || 0);
        setFormError('');
        setModalOpen(true);
    };

    const openCertificationAddModal = () => {
        setModalType('certification');
        setEditingId(null);
        setCertTitle('');
        setCertIssuer('');
        setCertYear('');
        setCertLink('');
        setCertType('certification');
        setCertDescription('');
        setCertOrder(certificationItems.length + 1);
        setFormError('');
        setModalOpen(true);
    };

    const openCertificationEditModal = (cert) => {
        setModalType('certification');
        setEditingId(cert._id);
        setCertTitle(cert.title);
        setCertIssuer(cert.issuer);
        setCertYear(cert.year);
        setCertLink(cert.link || '');
        setCertType(cert.type);
        setCertDescription(cert.description || '');
        setCertOrder(cert.order || 0);
        setFormError('');
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        // Clear edit url queries if any
        if (searchParams.get('edit')) {
            router.push(`/admin?tab=${activeTab}`);
        }
    };

    // SUBMIT HANDLERS
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');
        setFormLoading(true);

        try {
            if (modalType === 'project') {
                if (images.length < 3 || images.length > 5) {
                    setFormError(`Please provide 3-5 images for the project (current: ${images.length}).`);
                    setFormLoading(false);
                    return;
                }

                const payload = { title, description, link, technologies, images };
                const url = editingId ? `/api/projects/${editingId}` : '/api/projects';
                const method = editingId ? 'PUT' : 'POST';

                const res = await fetch(url, {
                    method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });

                const data = await res.json();
                if (data.success) {
                    closeModal();
                    fetchProjects();
                } else {
                    setFormError(data.message || "Failed to save project.");
                }
            } else if (modalType === 'education') {
                const payload = { year: eduYear, company: eduCompany, role: eduRole, description: eduDescription, order: Number(eduOrder) };
                const url = editingId ? `/api/education/${editingId}` : '/api/education';
                const method = editingId ? 'PUT' : 'POST';

                const res = await fetch(url, {
                    method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });

                const data = await res.json();
                if (data.success) {
                    closeModal();
                    fetchEducation();
                } else {
                    setFormError(data.message || "Failed to save entry.");
                }
            } else {
                // Certification Type
                const payload = { 
                    title: certTitle, 
                    issuer: certIssuer, 
                    year: certYear, 
                    link: certLink, 
                    type: certType, 
                    description: certDescription, 
                    order: Number(certOrder) 
                };
                const url = editingId ? `/api/certifications/${editingId}` : '/api/certifications';
                const method = editingId ? 'PUT' : 'POST';

                const res = await fetch(url, {
                    method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });

                const data = await res.json();
                if (data.success) {
                    closeModal();
                    fetchCertifications();
                } else {
                    setFormError(data.message || "Failed to save credential.");
                }
            }
        } catch (err) {
            setFormError("An error occurred. Please try again.");
        } finally {
            setFormLoading(false);
        }
    };

    // Change Tab
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        router.push(`/admin?tab=${tab}`);
    };

    if (loading && !authenticated) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#020617]">
                <div className="w-12 h-12 border-4 border-[#C4F000] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-400 mt-4 font-medium">Checking authorization...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#020617] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Top header bar */}
                <div className="flex flex-wrap justify-between items-center bg-zinc-950 border border-zinc-800 rounded-3xl p-6 mb-10 gap-4 shadow-xl">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                            Admin <span className="text-[#C4F000]">Dashboard</span>
                        </h1>
                        <p className="text-gray-400 text-sm mt-1">Manage and update your portfolio details.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => {
                                if (activeTab === 'projects') openProjectAddModal();
                                else if (activeTab === 'education') openEducationAddModal();
                                else openCertificationAddModal();
                            }}
                            className="bg-[#C4F000] hover:bg-[#b8dd00] text-black px-5 py-2.5 rounded-full font-bold text-sm transition-all hover:scale-105 flex items-center gap-2"
                        >
                            <FaPlus /> Add {activeTab === 'projects' ? 'Project' : activeTab === 'education' ? 'Timeline Entry' : 'Credential'}
                        </button>
                        <button
                            onClick={handleLogout}
                            className="bg-red-950/20 border border-red-500/30 hover:bg-red-950/40 text-red-400 px-4 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2"
                        >
                            <FaSignOutAlt /> Log Out
                        </button>
                    </div>
                </div>

                {/* Dashboard Tabs Selector */}
                <div className="flex border-b border-zinc-800 mb-8 gap-6 text-sm overflow-x-auto whitespace-nowrap">
                    <button
                        onClick={() => handleTabChange('projects')}
                        className={`pb-4 px-2 font-bold transition-all relative ${activeTab === 'projects' ? 'text-[#C4F000]' : 'text-gray-400 hover:text-white'}`}
                    >
                        <span className="flex items-center gap-2"><FaGlobe /> Projects ({projects.length})</span>
                        {activeTab === 'projects' && (
                            <motion.div layoutId="active_tab_indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C4F000]" />
                        )}
                    </button>
                    <button
                        onClick={() => handleTabChange('education')}
                        className={`pb-4 px-2 font-bold transition-all relative ${activeTab === 'education' ? 'text-[#C4F000]' : 'text-gray-400 hover:text-white'}`}
                    >
                        <span className="flex items-center gap-2"><FaBriefcase /> Education & Experience ({educationItems.length})</span>
                        {activeTab === 'education' && (
                            <motion.div layoutId="active_tab_indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C4F000]" />
                        )}
                    </button>
                    <button
                        onClick={() => handleTabChange('certifications')}
                        className={`pb-4 px-2 font-bold transition-all relative ${activeTab === 'certifications' ? 'text-[#C4F000]' : 'text-gray-400 hover:text-white'}`}
                    >
                        <span className="flex items-center gap-2"><FaAward /> Certifications & Awards ({certificationItems.length})</span>
                        {activeTab === 'certifications' && (
                            <motion.div layoutId="active_tab_indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C4F000]" />
                        )}
                    </button>
                </div>

                {/* Content based on Active Tab */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl">
                    
                    {activeTab === 'projects' && (
                        /* PROJECTS TAB */
                        <div>
                            <h2 className="text-xl font-bold text-white mb-6">Manage Projects</h2>
                            {projects.length === 0 ? (
                                <div className="text-center py-20 border border-dashed border-zinc-800 rounded-2xl text-gray-500">
                                    <p className="text-lg">No projects added yet.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {projects.map((project) => (
                                        <div key={project._id} className="bg-zinc-900/40 border border-zinc-850 rounded-2xl p-5 flex flex-col justify-between hover:border-zinc-700 transition-all duration-300 shadow-md group">
                                            <div>
                                                <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-black/40 border border-zinc-800">
                                                    <img src={project.images[0]?.url || project.images[0] || "/assets/p1.png"} alt={project.title} className="w-full h-full object-cover" />
                                                    <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm border border-zinc-800 text-[11px] font-semibold text-gray-300 px-2 py-0.5 rounded-full">
                                                        {project.images.length} Images
                                                    </div>
                                                </div>
                                                <h3 className="text-lg font-bold text-white group-hover:text-[#C4F000] transition-colors">{project.title}</h3>
                                                <p className="text-gray-400 text-xs mt-1.5 line-clamp-2 leading-relaxed">{project.description}</p>
                                                <div className="flex flex-wrap gap-1.5 mt-3">
                                                    {project.technologies.map((t, idx) => (
                                                        <span key={idx} className="text-[10px] bg-zinc-850 text-gray-400 px-2.5 py-0.5 rounded-full">{t}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex gap-2.5 mt-5 pt-4 border-t border-zinc-850/60">
                                                <button onClick={() => openProjectEditModal(project)} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-2 px-3 rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5"><FaEdit /> Edit</button>
                                                <button onClick={() => handleDeleteProject(project._id)} className="bg-red-950/20 border border-red-500/30 hover:bg-red-900/30 text-red-400 font-bold py-2 px-3 rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5"><FaTrash /> Delete</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'education' && (
                        /* EDUCATION & EXPERIENCE TAB */
                        <div>
                            <h2 className="text-xl font-bold text-white mb-6">Manage Timeline Entries</h2>
                            {educationItems.length === 0 ? (
                                <div className="text-center py-20 border border-dashed border-zinc-800 rounded-2xl text-gray-500">
                                    <p className="text-lg">No education or experience entries added yet.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {educationItems.map((edu) => (
                                        <div key={edu._id} className="bg-zinc-900/40 border border-zinc-850 hover:border-zinc-700 p-5 rounded-2xl flex flex-col md:flex-row justify-between md:items-center gap-4 transition-all duration-300">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xs font-bold text-[#C4F000] border border-[#C4F000]/40 px-2.5 py-0.5 rounded-full">{edu.year}</span>
                                                    <span className="text-[11px] bg-zinc-800 text-gray-500 px-2 py-0.5 rounded">Order: {edu.order}</span>
                                                </div>
                                                <h3 className="text-lg font-bold text-white mt-1">{edu.company}</h3>
                                                <p className="text-sm font-semibold text-gray-300">{edu.role}</p>
                                                <p className="text-xs text-gray-500 max-w-3xl leading-relaxed mt-2">{edu.description}</p>
                                            </div>
                                            <div className="flex gap-2 shrink-0 md:self-center">
                                                <button onClick={() => openEducationEditModal(edu)} className="p-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs transition-colors flex items-center gap-1.5"><FaEdit /> Edit</button>
                                                <button onClick={() => handleDeleteEducation(edu._id)} className="p-2.5 bg-red-950/20 border border-red-500/30 hover:bg-red-900/30 text-red-400 rounded-xl text-xs transition-colors flex items-center gap-1.5"><FaTrash /> Delete</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'certifications' && (
                        /* CERTIFICATIONS & AWARDS TAB */
                        <div>
                            <h2 className="text-xl font-bold text-white mb-6">Manage Credentials & Awards</h2>
                            {certificationItems.length === 0 ? (
                                <div className="text-center py-20 border border-dashed border-zinc-800 rounded-2xl text-gray-500">
                                    <p className="text-lg">No credentials or awards added yet.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {certificationItems.map((cert) => (
                                        <div key={cert._id} className="bg-zinc-900/40 border border-zinc-850 hover:border-zinc-700 p-5 rounded-2xl flex flex-col md:flex-row justify-between md:items-center gap-4 transition-all duration-300">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xs font-bold text-indigo-400 border border-indigo-400/40 px-2.5 py-0.5 rounded-full">{cert.type === 'award' ? 'Award' : 'Certification'}</span>
                                                    <span className="text-xs text-gray-400 font-semibold">{cert.year}</span>
                                                    <span className="text-[11px] bg-zinc-800 text-gray-500 px-2 py-0.5 rounded">Order: {cert.order}</span>
                                                </div>
                                                <h3 className="text-lg font-bold text-white mt-1">{cert.title}</h3>
                                                <p className="text-sm font-semibold text-gray-300">{cert.issuer}</p>
                                                {cert.link && <p className="text-xs text-blue-400 font-mono mt-1 break-all">{cert.link}</p>}
                                                {cert.description && <p className="text-xs text-gray-500 max-w-3xl leading-relaxed mt-2">{cert.description}</p>}
                                            </div>
                                            <div className="flex gap-2 shrink-0 md:self-center">
                                                <button onClick={() => openCertificationEditModal(cert)} className="p-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs transition-colors flex items-center gap-1.5"><FaEdit /> Edit</button>
                                                <button onClick={() => handleDeleteCertification(cert._id)} className="p-2.5 bg-red-950/20 border border-red-500/30 hover:bg-red-900/30 text-red-400 rounded-xl text-xs transition-colors flex items-center gap-1.5"><FaTrash /> Delete</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                </div>
            </div>

            {/* Combined Add/Edit Modal */}
            <AnimatePresence>
                {modalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 15 }} className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto z-10">
                            <button onClick={closeModal} className="absolute top-5 right-5 p-2 text-gray-500 hover:text-white rounded-full bg-zinc-900 transition-colors border border-zinc-800"><FaTimes /></button>

                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
                                {editingId ? "Edit" : "Add"} {modalType === 'project' ? "Project" : modalType === 'education' ? "Timeline Entry" : "Credential / Award"}
                            </h3>

                            {formError && (
                                <div className="bg-red-950/30 border border-red-500/50 text-red-400 p-4 rounded-2xl text-sm mb-6">{formError}</div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {modalType === 'project' && (
                                    /* PROJECT FORM CONTENT */
                                    <>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Project Title</label>
                                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Acme SaaS" required className="w-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C4F000]/50 transition-all" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Description</label>
                                            <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Explain the project details..." required className="w-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C4F000]/50 resize-none transition-all" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Live URL Link (Optional)</label>
                                            <div className="relative">
                                                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500 text-sm"><FaGlobe /></span>
                                                <input type="url" value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://example.com" className="w-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C4F000]/50 transition-all" />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Technologies (Hit Enter/Comma)</label>
                                            <div className="w-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl p-2.5 flex flex-wrap gap-1.5 items-center">
                                                {technologies.map((tech, idx) => (
                                                    <span key={idx} className="text-xs bg-zinc-850 border border-zinc-750 text-white px-2.5 py-1 rounded-full flex items-center gap-1.5">
                                                        {tech}
                                                        <button type="button" onClick={() => removeTech(idx)} className="text-gray-500 hover:text-red-400"><FaTimes className="text-[10px]" /></button>
                                                    </span>
                                                ))}
                                                <input type="text" value={techInput} onChange={(e) => setTechInput(e.target.value)} onKeyDown={handleAddTech} placeholder={technologies.length === 0 ? "e.g. NextJS, Tailwind" : "Add..."} className="bg-transparent text-white border-none outline-none focus:ring-0 text-sm flex-1 min-w-[100px] py-0.5" />
                                            </div>
                                        </div>
                                        <div className="space-y-2.5">
                                            <div className="flex justify-between items-center">
                                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Project Images (Need 3 to 5 images)</label>
                                                <span className="text-[11px] font-bold text-gray-500">{images.length} / 5 Images</span>
                                            </div>
                                            {images.length < 5 && (
                                                <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-zinc-800 hover:border-[#C4F000]/60 bg-zinc-900/30 rounded-2xl py-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors">
                                                    <FaImage className="text-2xl text-gray-500" />
                                                    <span className="text-xs text-gray-400 font-medium">Click to upload and compress</span>
                                                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} multiple accept="image/*" className="hidden" />
                                                </div>
                                            )}
                                            {images.length > 0 && (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                                                    {images.map((img, idx) => (
                                                        <div key={idx} className="relative bg-zinc-900 border border-zinc-800/80 p-3 rounded-2xl flex flex-col gap-2 group/img shadow-md">
                                                            <div className="relative aspect-video rounded-xl overflow-hidden bg-black/60 border border-zinc-850">
                                                                <img src={img.url || img} alt="preview" className="w-full h-full object-cover" />
                                                                <button type="button" onClick={() => removeImage(idx)} className="absolute top-2 right-2 p-1.5 bg-red-650 hover:bg-red-600 text-white rounded-full transition-all opacity-0 group-hover/img:opacity-100 scale-90 shadow-md"><FaTimes className="text-[10px]" /></button>
                                                            </div>
                                                            <input
                                                                type="text"
                                                                value={img.title || ''}
                                                                onChange={(e) => updateImageTitle(idx, e.target.value)}
                                                                placeholder="Image title/caption (e.g. Landing Page)"
                                                                required
                                                                className="w-full bg-zinc-950 border border-zinc-800 text-xs px-2.5 py-1.5 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#C4F000]/50"
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}

                                {modalType === 'education' && (
                                    /* EDUCATION/EXPERIENCE FORM CONTENT */
                                    <>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Year Range</label>
                                            <input type="text" value={eduYear} onChange={(e) => setEduYear(e.target.value)} placeholder="e.g. 2020 - PRESENT" required className="w-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C4F000]/50 transition-all" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Company / School / Institution</label>
                                            <input type="text" value={eduCompany} onChange={(e) => setEduCompany(e.target.value)} placeholder="e.g. BloomHub Technology" required className="w-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C4F000]/50 transition-all" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Role / Degree / Position</label>
                                            <input type="text" value={eduRole} onChange={(e) => setEduRole(e.target.value)} placeholder="e.g. Application Developer" required className="w-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C4F000]/50 transition-all" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Display Order (Sorting)</label>
                                            <input type="number" value={eduOrder} onChange={(e) => setEduOrder(e.target.value)} required className="w-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C4F000]/50 transition-all" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Description</label>
                                            <textarea rows={4} value={eduDescription} onChange={(e) => setEduDescription(e.target.value)} placeholder="Explain what you did or studied during this period..." required className="w-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C4F000]/50 resize-none transition-all" />
                                        </div>
                                    </>
                                )}

                                {modalType === 'certification' && (
                                    /* CERTIFICATIONS/AWARDS FORM CONTENT */
                                    <>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Credential Type</label>
                                                <select value={certType} onChange={(e) => setCertType(e.target.value)} required className="w-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C4F000]/50 transition-all">
                                                    <option value="certification">Certification</option>
                                                    <option value="award">Award / Honor</option>
                                                </select>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Year Completed</label>
                                                <input type="text" value={certYear} onChange={(e) => setCertYear(e.target.value)} placeholder="e.g. 2024" required className="w-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C4F000]/50 transition-all" />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Title / Name of Credential</label>
                                            <input type="text" value={certTitle} onChange={(e) => setCertTitle(e.target.value)} placeholder="e.g. Meta Front-End Developer Certificate" required className="w-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C4F000]/50 transition-all" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Issuer / Awarding Body</label>
                                            <input type="text" value={certIssuer} onChange={(e) => setCertIssuer(e.target.value)} placeholder="e.g. Coursera / Meta" required className="w-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C4F000]/50 transition-all" />
                                        </div>
                                        <div className="grid grid-cols-4 gap-4">
                                            <div className="col-span-3 space-y-1.5">
                                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Credential Verification URL (Optional)</label>
                                                <input type="url" value={certLink} onChange={(e) => setCertLink(e.target.value)} placeholder="https://coursera.org/verify/..." className="w-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C4F000]/50 transition-all" />
                                            </div>
                                            <div className="col-span-1 space-y-1.5">
                                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Display Order</label>
                                                <input type="number" value={certOrder} onChange={(e) => setCertOrder(e.target.value)} required className="w-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C4F000]/50 transition-all" />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Short Description (Optional)</label>
                                            <textarea rows={3} value={certDescription} onChange={(e) => setCertDescription(e.target.value)} placeholder="Summarize what was achieved..." className="w-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C4F000]/50 resize-none transition-all" />
                                        </div>
                                    </>
                                )}

                                {/* Modal action buttons */}
                                <div className="flex gap-3 pt-4 border-t border-zinc-900 mt-6">
                                    <button type="button" onClick={closeModal} className="flex-1 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-white font-bold py-3.5 rounded-xl transition-all text-sm">Cancel</button>
                                    <button type="submit" disabled={formLoading} className="flex-1 bg-[#C4F000] hover:bg-[#b8dd00] text-black font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm disabled:opacity-50">
                                        {formLoading ? <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div> : (editingId ? "Save Changes" : "Create")}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function AdminDashboard() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#020617]">
                <div className="w-12 h-12 border-4 border-[#C4F000] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-400 mt-4 font-medium">Loading Admin Dashboard...</p>
            </div>
        }>
            <AdminDashboardContent />
        </Suspense>
    );
}
