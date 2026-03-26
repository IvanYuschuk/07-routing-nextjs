import { fetchNotes } from "@/lib/api";
import {
    QueryClient,
    HydrationBoundary,
    dehydrate,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";

const Notes = async () => {
    const queryClient = new QueryClient();

    const initialSearchNote = '';
    const initialPage = 1;
    
    await queryClient.prefetchQuery({
        queryKey: ["notes", initialSearchNote, initialPage],
        queryFn: () => fetchNotes({ searchNote: initialSearchNote, page: initialPage }),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
           <NotesClient />
        </HydrationBoundary>
    );
};

export default Notes;