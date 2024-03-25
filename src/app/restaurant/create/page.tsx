import React from 'react';
import UploadImage from '@/components/UploadImage';

const CreateReservationPage = () => {

    return (
        <div className="pl-12 pr-10 w-full h-screen overflow-y-auto">
            <h1 className="text-3xl md:text-4xl font-semibold">
                Create Restaurant
            </h1>

            <main className="w-full lg:gap-10 flex flex-row items-center flex-wrap lg:flex-nowrap">
                <div className="w-full lg:w-1/2 flex justify-center mt-5 lg:mt-0">
                    <UploadImage />
                </div>

                <form className="rounded-[1rem] p-5 md:p-10 w-full lg:w-1/2 text-lg shadow-lg border-2 mt-6 lg:mt-0 mb-6">
                    <div className="space-y-4">
                        {/* Restaurant Name input field */}
                        <div>
                            <label
                                htmlFor="restaurantName"
                                className="block mb-2 text-md font-semibold text-gray-900"
                            >
                                Restaurant Name
                            </label>
                            <input
                                type="text"
                                id="restaurantName"
                                name="restaurantName"
                                placeholder="e.g. Mo-Mo-Paradise"
                                className="bg-gray-50 border-2 font-light text-md border-gray-200 text-gray-900 rounded-xl focus:ring-redrice-yellow focus:border-redrice-yellow block w-full px-3 py-1.5"
                                required
                            />
                        </div>

                        {/* Address input field */}
                        <div>
                            <label
                                htmlFor="address"
                                className="block mb-2 text-md font-semibold text-gray-900"
                            >
                                Address
                            </label>
                            <textarea
                                id="address"
                                name="address"
                                placeholder="eg. Lu Lu พระรามได้ (ไทยดี) สาขา CentralWorld (ชั้น 7) 7th Fl., 999/9 Rama I Road, Pathumwan, Pathumwan, Bangkok 10330, Thailand"
                                className="bg-gray-50 border-2 font-light text-md border-gray-200 text-gray-900 rounded-xl focus:ring-redrice-yellow focus:border-redrice-yellow block w-full px-3 py-1.5"
                                required
                            ></textarea>
                        </div>
                        {/* Telephone input field */}
                        <div>
                            <label
                                htmlFor="telephone"
                                className="block mb-2 text-md font-semibold text-gray-900"
                            >
                                Telephone
                            </label>
                            <input
                                type="tel"
                                id="telephone"
                                name="telephone"
                                placeholder="e.g. 0922698678"
                                className="bg-gray-50 border-2 font-light text-md border-gray-200 text-gray-900 rounded-xl focus:ring-redrice-yellow focus:border-redrice-yellow block w-full px-3 py-1.5"
                                required
                            />
                        </div>

                        {/* Open Time input field */}
                        <div>
                            <label
                                htmlFor="openTime"
                                className="block mb-2 text-md font-semibold text-gray-900"
                            >
                                Open Time
                            </label>
                            <input
                                type="time"
                                id="openTime"
                                name="openTime"
                                placeholder="e.g. 13:00"
                                className="bg-gray-50 border-2 font-light text-md border-gray-200 text-gray-900 rounded-xl focus:ring-redrice-yellow focus:border-redrice-yellow block w-full px-3 py-1.5"
                                required
                            />
                        </div>

                        {/* Close Time input field */}
                        <div>
                            <label
                                htmlFor="closeTime"
                                className="block mb-2 text-md font-semibold text-gray-900"
                            >
                                Close Time
                            </label>
                            <input
                                type="time"
                                id="closeTime"
                                name="closeTime"
                                placeholder="e.g. 2:00 am"
                                className="bg-gray-50 border-2 font-light text-md border-gray-200 text-gray-900 rounded-xl focus:ring-redrice-yellow focus:border-redrice-yellow block w-full px-3 py-1.5"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button className="bg-redrice-yellow hover:bg-redrice-light-yellow px-5 py-3 text-white font-semibold rounded-3xl text-xl w-full lg:w-1/2 mt-8">
                            Create Restaurant
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default CreateReservationPage;
