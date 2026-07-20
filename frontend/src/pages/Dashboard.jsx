import {
    useEffect,
    useState,
} from "react";

import {
    getNotes,
    createNote,
    deleteNote,
    updateNote,
} from "../api/notesAPI";

import {
    useSelector,
    useDispatch,
} from "react-redux";

import {
    useNavigate,
} from "react-router-dom";

import {
    logout,
} from "../features/auth/authSlice";

import { toast } from "react-toastify";

function Dashboard() {

    const [notes, setNotes] =
        useState([]);

    const token =
        useSelector(
            (state) =>
                state.auth.accessToken
        );
    // console.log(
    //     "Dashboard Token:",
    //     token
    // );

    const [title, setTitle] =
        useState("");

    const [content, setContent] =
        useState("");

    const [searchTerm, setSearchTerm] =
        useState("");

    const [selectedCategory,
        setSelectedCategory] =
        useState("All");

    const [showModal,
        setShowModal] =
        useState(false);

    const [editingId, setEditingId] =
        useState(null);

    const [editTitle, setEditTitle] =
        useState("");

    const [editContent, setEditContent] =
        useState("");

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [error, setError] =
        useState("");

    const fetchNotes = async () => {

        console.log(
            "fetchNotes started"
        );

        try {

            setLoading(true);

            // console.log(
            //     "Calling getNotes..."
            // );

            const data =
                await getNotes(token);

            // console.log(
            //     "Fetched Notes:",
            //     data
            // );

            setNotes(data);

            setError("");

        } catch (error) {

            console.error(error);

            // console.error(
            //     "Fetch Error:",
            //     error
            // );

            toast.error(
                "Something went wrong!"
            );

            setError(
                "Failed to load notes."
            );

        } finally {

            setLoading(false);

            console.log(
                "fetchNotes finished"
            );
        }
    };

    useEffect(() => {

        if (token) {

            console.log(
                "Token exists, fetching notes"
            );

            fetchNotes();
        }

    }, [token]);

    const handleCreateNote =
        async () => {

            try {

                const newNote =
                    await createNote(
                        token,
                        {
                            title,
                            content,
                            category,
                        }
                    );

                setNotes(
                    [...notes, newNote]
                );
                toast.success(
                    "Note Created Successfully!"
                );

                setTitle("");
                setContent("");

                setCategory(
                    "Personal"
                );

                setShowModal(
                    false
                );

            } catch (error) {

                console.error(
                    error
                );

                toast.error(
                    "Something went wrong!"
                );

            }
        };

    useEffect(() => {

        const handleKeyDown =
            (e) => {

                if (
                    e.key === "Escape"
                ) {

                    setShowModal(
                        false
                    );

                }

            };

        window.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {

            window.removeEventListener(
                "keydown",
                handleKeyDown
            );

        };

    }, []);

    const handleDeleteNote =
        async (noteId) => {

            try {

                await deleteNote(
                    token,
                    noteId
                );

                setNotes(
                    notes.filter(
                        (note) =>
                            note.id !== noteId
                    )
                );
                toast.success(
                    "Note Deleted!"
                );

            } catch (error) {

                console.error(
                    error
                );

                toast.error(
                    "Something went wrong!"
                );

            }
        };

    const handleLogout = () => {

        dispatch(logout());

        navigate("/");

    };

    const handleEditClick =
        (note) => {

            setEditingId(
                note.id
            );

            setEditTitle(
                note.title
            );

            setEditContent(
                note.content
            );
        };

    const handleSaveEdit =
        async (noteId) => {

            try {

                const updatedNote =
                    await updateNote(
                        token,
                        noteId,
                        {
                            title: editTitle,
                            content: editContent,
                        }
                    );

                setNotes(
                    notes.map(
                        (note) =>
                            note.id === noteId
                                ? updatedNote
                                : note
                    )
                );

                toast.success(
                    "Note Updated!"
                );

                setEditingId(
                    null
                );

            } catch (error) {

                console.error(
                    error
                );

                toast.error(
                    "Something went wrong!"
                );

            }
        };

    const [loading, setLoading] =
        useState(false);

    // const [error, setError] =
    //     useState("");

    const [darkMode, setDarkMode] =
        useState(false);

    const [category, setCategory] =
        useState("Personal");

    const filteredNotes =
        notes
            .filter((note) => {

                const matchesSearch =

                    note.title
                        .toLowerCase()
                        .includes(
                            searchTerm.toLowerCase()
                        )

                    ||

                    note.content
                        .toLowerCase()
                        .includes(
                            searchTerm.toLowerCase()
                        );

                const matchesCategory =

                    selectedCategory
                    === "All"

                    ||

                    note.category
                    === selectedCategory;

                return (
                    matchesSearch &&
                    matchesCategory
                );

            })
            .sort(
                (a, b) =>
                    b.pinned -
                    a.pinned
            );

    const handlePinNote =
        async (note) => {

            try {

                const updatedNote =
                    await updateNote(
                        token,
                        note.id,
                        {
                            ...note,
                            pinned:
                                !note.pinned,
                        }
                    );

                setNotes(
                    notes.map((n) =>
                        n.id === note.id
                            ? updatedNote
                            : n
                    )
                );

                toast.success(
                    note.pinned
                        ? "Note Unpinned"
                        : "Note Pinned"
                );

            } catch (error) {

                toast.error(
                    "Failed to update note"
                );

            }
        };

    return (
        <div
            className={
                darkMode
                    ? "min-h-screen bg-gray-900 text-white"
                    : "min-h-screen bg-gray-100 text-black"
            }
        >
            <nav
                className={`
                    ${darkMode
                        ? "bg-black"
                        : "bg-white"
                    }
                    shadow-md
                    px-8
                    py-4
                    flex
                    justify-between
                    items-center
                    transition
                    fixed top-0 left-0 z-50 w-full`}
            >

                <h1
                    className={`
                        text-2xl
                        font-bold
                        ${darkMode
                            ? "text-white"
                            : "text-black"
                        }
                        transition`
                    }
                >
                    Personal Notes
                </h1>

                <div className="flex gap-3">

                    <button
                        onClick={() =>
                            setDarkMode(
                                !darkMode
                            )
                        }
                        className="
                        bg-gray-700
                        text-white
                        px-4
                        py-2
                        rounded-lg"
                    >
                        {
                            darkMode
                                ? "☀ Light"
                                : "🌙 Dark"
                        }
                    </button>

                    <button
                        onClick={handleLogout}
                        className="
                        bg-red-500
                        text-white
                        px-4
                        py-2
                        rounded-lg
                        hover:bg-red-600"
                    >
                        Logout
                    </button>

                </div>

            </nav>

            <div
                className="
                    max-w-6xl
                    mx-auto
                    p-8"
            >
                {/* <h1>Dashboard</h1>

                <button
                    onClick={handleLogout}
                >
                    Logout
                </button> */}

                {/* <hr /> */}

                <br />
                <br />
                <br />

                <div
                    className="
                        flex
                        justify-between
                        items-center
                        mb-8"
                >

                    <h1
                        className="
                            text-4xl
                            font-bold"
                    >
                        My Notes
                    </h1>

                    <button
                        onClick={() =>
                            setShowModal(true)
                        }
                        className="
                            bg-blue-600
                            text-white
                            px-5
                            py-3
                            rounded-xl
                            hover:bg-blue-700
                            transition"
                    >
                        + New Note
                    </button>

                </div>

                {/* <h2 className="
                    text-2xl
                    font-bold
                    mb-4"
                >
                    Create Note
                </h2>

                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                    className={`
                        w-full
                        p-3
                        border
                        rounded-lg
                        mb-4`
                    }
                />

                <br />
                <br />

                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) =>
                        setContent(e.target.value)
                    }
                    className={`
                        ${darkMode
                            ? "text-white"
                            : "text-black"
                        }
                        w-full
                        p-3
                        border
                        rounded-lg
                        mb-4`
                    }
                />

                <br />
                <br />

                <select
                    value={category}
                    onChange={(e) =>
                        setCategory(
                            e.target.value
                        )
                    }
                    className={`
                    w-full
                    p-3
                    border
                    rounded-lg
                    mb-4
                        ${darkMode
                            ? "bg-gray-900 text-white"
                            : "bg-gray-100 text-black"
                        }`
                    }
                >

                    <option
                        className={`
                                
                            `}
                    >
                        Personal
                    </option>

                    <option>
                        Study
                    </option>

                    <option>
                        Work
                    </option>

                    <option>
                        Project
                    </option>

                </select>

                <button
                    onClick={
                        handleCreateNote
                    }
                    className="
                    bg-blue-500
                    text-white
                    px-5
                    py-3
                    rounded-lg
                    hover:bg-blue-600
                    transition"
                >
                    Create Note
                </button> */}

                <br />
                <br />

                {/* <hr /> */}

                <div
                    className="
                        flex
                        gap-3
                        flex-wrap
                        mb-4"
                >

                    {[
                        "All",
                        "Personal",
                        "Study",
                        "Work",
                        "Project"
                    ].map((category) => (

                        <button
                            key={category}
                            onClick={() =>
                                setSelectedCategory(
                                    category
                                )
                            }
                            className={`
                                px-4
                                py-2
                                rounded-lg
                                transition

                                ${selectedCategory
                                    === category

                                    ? "bg-blue-600 text-white"

                                    : darkMode

                                        ? "bg-gray-800 text-white"

                                        : "bg-gray-200 text-black"
                                }
                            `}
                        >
                            {category}
                        </button>

                    ))}

                </div>

                <div className="mb-6">

                    <input
                        type="text"
                        placeholder="🔍 Search Notes..."
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(
                                e.target.value
                            )
                        }
                        className={`
                            w-full
                            p-3
                            border
                            rounded-lg
                            ${darkMode
                                ? "bg-gray-800 text-white border-gray-700"
                                : "bg-white text-black"
                            }`
                        }
                    />

                </div>

                {
                    filteredNotes.length === 0 &&
                    (
                        <div
                            className={`
                                rounded-xl
                                shadow-md
                                p-10
                                text-center
                                ${darkMode
                                    ? "bg-gray-600"
                                    : "bg-white"
                                }
                                `
                            }
                        >

                            <h3
                                className={`
                                    text-xl
                                    font-semibold
                                    ${darkMode
                                        ? "text-white"
                                        : "text-black"
                                    }`
                                }
                            >
                                {searchTerm
                                    ? "No Notes Found"
                                    : "No Notes Yet"}
                            </h3>
                            <p
                                className={`
                                    mt-2
                                    ${darkMode
                                        ? "text-gray-200"
                                        : "text-gray-500"
                                    }`
                                }
                            >
                                {searchTerm
                                    ? "Try a different search."
                                    : "Create your first note."}
                            </p>

                        </div>
                    )
                }

                <h2
                    className="
                        text-xl
                        font-semibold
                        mb-4"
                >
                    Showing:
                    {" "}
                    {selectedCategory}
                </h2>

                <h2
                    className="
                    text-2xl
                    font-bold
                    mt-10
                    mb-6"
                >
                    Your Notes
                </h2>

                <div
                    className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    lg:grid-cols-3
                    gap-6"
                >

                    {
                        showModal && (
                            <div
                                className="
                                    fixed
                                    inset-0
                                    bg-black/50
                                    flex
                                    item-center
                                    justify-center
                                    z-50    
                                "
                            >
                                <div
                                    className={`
                                        ${darkMode
                                            ? "bg-gray-800"
                                            : "bg-white"
                                        }
                                        p-6
                                        rounded-2xl
                                        shadow-xl
                                        w-full
                                        max-w-lg
                                    `}
                                >
                                    <h2 className={`
                                            text-2xl
                                            font-bold
                                            mb-4
                                            ${darkMode
                                                ? "text-white"
                                                : "text-black"
                                            }
                                        `}
                                    >
                                        Create Note
                                    </h2>

                                    <input
                                        type="text"
                                        placeholder="Title"
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                        className={`
                                            w-full
                                            p-3
                                            border
                                            rounded-lg
                                            mb-4`
                                        }
                                    />

                                    <br />
                                    <br />

                                    <textarea
                                        placeholder="Content"
                                        value={content}
                                        onChange={(e) =>
                                            setContent(e.target.value)
                                        }
                                        className={`
                                            ${darkMode
                                                ? "text-white"
                                                : "text-black"
                                            }
                                            w-full
                                            p-3
                                            border
                                            rounded-lg
                                            mb-4`
                                        }
                                    />

                                    <br />
                                    <br />

                                    <select
                                        value={category}
                                        onChange={(e) =>
                                            setCategory(
                                                e.target.value
                                            )
                                        }
                                        className={`
                                            w-full
                                            p-3
                                            border
                                            rounded-lg
                                            mb-4
                                            ${darkMode
                                                ? "bg-gray-900 text-white"
                                                : "bg-gray-100 text-black"
                                            }`
                                        }
                                    >

                                        <option>
                                            Personal
                                        </option>

                                        <option>
                                            Study
                                        </option>

                                        <option>
                                            Work
                                        </option>

                                        <option>
                                            Project
                                        </option>

                                    </select>

                                    <button
                                        onClick={
                                            handleCreateNote
                                        }
                                        className="
                                            bg-blue-500
                                            text-white
                                            px-5
                                            py-3
                                            rounded-lg
                                            hover:bg-blue-600
                                            transition
                                        "
                                    >
                                        Create Note
                                    </button>
                                </div>
                            </div>
                        )
                    }

                    {filteredNotes.map((note) => (

                        <div key={note.id}
                            className={`
                                ${darkMode
                                    ? "bg-gray-800 text-white"
                                    : "bg-white text-black"
                                }
                                rounded-xl
                                shadow-md
                                p-5
                                hover:shadow-xl
                                transition`
                            }
                        >

                            {
                                editingId === note.id
                                    ? (
                                        <>
                                            <input
                                                value={editTitle}
                                                onChange={(e) =>
                                                    setEditTitle(
                                                        e.target.value
                                                    )
                                                }
                                            />

                                            <textarea
                                                value={editContent}
                                                onChange={(e) =>
                                                    setEditContent(
                                                        e.target.value
                                                    )
                                                }
                                            />

                                            <button
                                                onClick={() =>
                                                    handleSaveEdit(
                                                        note.id
                                                    )
                                                }
                                            >
                                                Save
                                            </button>

                                            <button
                                                onClick={() =>
                                                    setEditingId(
                                                        null
                                                    )
                                                }
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    )
                                    : (
                                        <>
                                            <h3
                                                className="
                                                text-xl
                                                font-bold
                                                mb-3"
                                            >
                                                {note.title}
                                            </h3>

                                            <p
                                                className="
                                                text-gray-600
                                                mb-5"
                                            >
                                                {note.content}
                                            </p>

                                            <span
                                                className="
                                                inline-block
                                                bg-blue-100
                                                text-blue-700
                                                px-3
                                                py-1
                                                rounded-full
                                                text-sm
                                                mb-3"
                                            >
                                                {note.category}
                                            </span>
                                        </>
                                    )
                            }

                            <div
                                className="
                                flex
                                gap-3"
                            >

                                <button
                                    onClick={() =>
                                        handleEditClick(note)
                                    }
                                    className="
                                    bg-yellow-500
                                    text-white
                                    px-4
                                    py-2
                                    rounded-lg
                                    hover:bg-yellow-600
                                    transition"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        handleDeleteNote(
                                            note.id
                                        )
                                    }
                                    className="
                                    bg-red-500
                                    text-white
                                    px-4
                                    py-2
                                    rounded-lg
                                    hover:bg-red-600
                                    transition"
                                >
                                    Delete
                                </button>

                                <br />
                                <br />


                                <hr />
                            </div>

                            <div
                                className="
                                    flex
                                    justify-between
                                    items-center
                                    mb-3"
                            >

                                <span>
                                    {note.category}
                                </span>

                                <button
                                    onClick={() =>
                                        handlePinNote(note)
                                    }
                                    className="
                                        text-xl"
                                >
                                    {note.pinned
                                        ? "📌"
                                        : "📍"}
                                </button>

                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;