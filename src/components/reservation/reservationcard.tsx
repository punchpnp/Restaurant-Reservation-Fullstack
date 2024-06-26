'use client';
import { useReducer, useState } from 'react';
import Image from 'next/image';
import ConfirmDeleteReserve from '../ConfirmDeleteReserve';
import { deleteReservation } from '@/lib/reservation';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { RiEditLine } from 'react-icons/ri';
import Link from 'next/link';
export default function ReservationCard({
    id,
    forDelete,
    name,
    table,
    time,
    state,
    picture,
}: {
    id: number;
    forDelete: string;
    name: string;
    table: number;
    time: string;
    state: string;
    picture: string;
}) {
    const [reservationState] = useState<string>(state);
    const getBackgroundColor = () => {
        switch (reservationState) {
            case 'Canceled':
                return 'bg-redrice-red';
            case 'Approved':
                return 'bg-redrice-green';
            case 'Pending':
                return 'bg-redrice-yellow';
            default:
                return 'bg-gray-100';
        }
    };
    const [show, setShow] = useState(false);
    const reducerShow = (state: boolean, action: { type: string }) => {
        switch (action.type) {
            case 'show':
                return true;
            case 'hide':
                return false;
            default:
                return state;
        }
    };
    const [resultShow, dispatchShow] = useReducer(reducerShow, show);

    const { data: session } = useSession();

    const router = useRouter();

    const onConfirm = async () => {
        dispatchShow({ type: 'hide' });
        if (!session?.user.token) return;
        const response = await deleteReservation(session.user.token, id);
        if (response) {
            console.log('Delete Success');
        }
        router.push('/reservation/done');
    };

    const hour = (parseInt(time.split(':')[0]) + 7) % 24;
    const minute = parseInt(time.split(':')[1]);
    const newDate =
        ('00' + hour.toString()).slice(-2) +
        ':' +
        ('00' + minute.toString()).slice(-2);

    const [deleted, setDeleted] = useState(false);

    const handleDelete = async () => {
        if (!session?.user.token) return;

        try {
            await deleteReservation(session.user.token, parseInt(forDelete));
            setDeleted(true);
        } catch (error) {
            console.error('Failed to delete reservation', error);
        }
    };

    if (deleted) {
        window.location.reload();
        // return null;
    }
    const handleEdit = async () => {};

    return (
        <div className="h-auto w-full rounded-[1rem] shadow-md m-2 flex flex-row py-2 md:py-7 items-center justify-between pr-5 pl-5 border-2 flex-wrap">
            {resultShow && (
                <ConfirmDeleteReserve
                    restaurant={name}
                    onCancel={() => dispatchShow({ type: 'hide' })}
                    onConfirm={onConfirm}
                />
            )}
            <div className="flex flex-row items-center flex-wrap justify-center gap-5 md:gap-0 mb-5 md:mb-0">
                <div className="flex flex-row items-center">
                    <h1 className="mr-5 md:mr-10">{id}</h1>
                    <div className="flex flex-row gap-5 md:gap-10 mr-3 md:mr-10 items-center flex-wrap">
                        <Image
                            src={picture || '/img/user/user1.png'}
                            alt="Product Picture"
                            width={50}
                            height={50}
                            className="object-cover rounded-full"
                        />

                        <h1>{name}</h1>
                    </div>
                </div>
                <div className="flex flex-row gap-10 items-center justify-center">
                    <h1>{table} Tables</h1>
                    <h1>{newDate}</h1>
                </div>
            </div>

            <div className="w-full md:w-auto flex justify-center items-center text-sm gap-3">
                <div
                    className={`${getBackgroundColor()} text-white font-semibold rounded-2xl px-10 py-2`}
                >
                    {state}
                </div>
                <Link href={`/reservation/update/${forDelete}`}>
                    <button className="bg-redrice-blue rounded-full hover:bg-sky-700 flex justify-center items-center text-white text-xl p-3">
                        <RiEditLine />
                    </button>
                </Link>
                <button
                    className="bg-redrice-red rounded-full hover:bg-red-700 flex justify-center items-center text-white text-xl p-3"
                    // onClick={() => dispatchShow({ type: 'show' })}
                    onClick={handleDelete}
                >
                    <RiDeleteBin5Fill />
                </button>
            </div>
        </div>
    );
}
