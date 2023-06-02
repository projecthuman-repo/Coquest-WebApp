import React from 'react'
import { CChart } from '@coreui/react-chartjs';
const RadarGraph = () => {
    return (
        <CChart
            style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto' }}
            type="radar"
            data={{
                labels: [
                    'Rites',
                    'Numeracy',
                    'Literacy',
                    'Charioteering',
                    'Archery',
                    'Music',
                ],
                datasets: [
                    {
                        label: 'Communication',
                        backgroundColor: 'rgba(164, 206, 57, 255)',
                        borderColor: 'rgba(164, 206, 57, 255)',
                        pointBackgroundColor: 'rgba(164, 206, 57, 255)',
                        pointBorderColor: '#fff',
                        data: [65, 59, 90, 81, 56, 55],
                    },
                    {
                        label: 'Organized',
                        backgroundColor: 'rgba(164, 206, 57, 255)',
                        borderColor: 'rgba(164, 206, 57, 255)',
                        pointBackgroundColor: 'rgba(164, 206, 57, 255)',
                        pointBorderColor: '#fff',
                        hidden: true,
                        data: [28, 48, 40, 19, 96, 27],
                    },
                    {
                        label: 'Driver',
                        backgroundColor: 'rgba(164, 206, 57, 255)',
                        borderColor: 'rgba(164, 206, 57, 255)',
                        pointBackgroundColor: 'rgba(164, 206, 57, 255)',
                        pointBorderColor: '#fff',
                        hidden: true,

                        data: [40, 41, 42, 43, 44, 45],
                    },
                ],
            }}

        />
    )
}

export default RadarGraph