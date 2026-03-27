"use client";

import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter} from "next/navigation";
import css from "./NotePreview.module.css";
import Modal from "@/components/Modal/Modal";

const NotePreviewClient = () => {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();

    const { data: note, isLoading, error } = useQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false,
    });
    
     if (isLoading) return <p>Loading, please wait...</p>;

    if (error || !note) return <p>Something went wrong.</p>;

    const formattedDate = note.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : `Created at: ${note.createdAt}`; 
    
    const onClose = () => router.back();

    return (
        <Modal onClose={onClose}>
            <div className={css.container}>
                <div className={css.item}>
                    <div className={css.header}>
                        <h2>{note.title}</h2>
                    </div>
                    <p className={css.content}>{note.content}</p>
                    <p className={css.date}>{formattedDate}</p>
                </div>
                <button
                    onClick={onClose}
                    className={css.backBtn}
                    type="button">
                    Close
                </button>
            </div>
        </Modal>
    );
}

export default NotePreviewClient