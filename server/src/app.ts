import fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from 'zod'
import dayjs from "dayjs";

const prisma = new PrismaClient()

export const app = fastify()

app.get('/test', async (request, reply) => {
    return "rararar"
})

app.post('/date', async (request, reply) => {

    const tempo = '2023-01-01'

    const newTempo = dayjs(tempo, 'YYYY-MM-DD')

    return newTempo

})

app.post('/create/hotel', async (request, reply) => {

    const createHotelBody = z.object({
        name: z.string()
    })

    const { name } = createHotelBody.parse(request.body)

    const hotel = await prisma.hotel.create({
        data: {
            name
        }
    })

    return hotel ? hotel : "Error"

})

app.post('/create/room/:hotelId', async (request, reply) => {

    const createRoomParams = z.object({
        hotelId: z.string()
    })

    const createRoomBody = z.object({
        name: z.string(),
        capacity: z.number()
    })

    const { hotelId } = createRoomParams.parse(request.params)
    const { name, capacity } = createRoomBody.parse(request.body)

    const room = await prisma.room.create({
        data: {
            name,
            capacity,
            hotelId
        }
    })

    return room ? room : "Error"
})

app.post('/create/reserve/:roomId', async (request, reply) => {

    const createReserveParams = z.object({
        roomId: z.string()
    })

    const createReserveBody = z.object({
        personName: z.string(),
        peopleComing: z.number(),
        checkInDate: z.string(),
        checkOutDate: z.string()
    })

    const { roomId } = createReserveParams.parse(request.params)
    const { personName, peopleComing, checkInDate, checkOutDate } = createReserveBody.parse(request.body)

    const newCheckInDate = dayjs(checkInDate)
    const newCheckOutDate = dayjs(checkOutDate)

    const reserve = prisma.reserve.create({
        data: {
            personName,
            peopleComing,
            checkInDate: newCheckInDate,
            checkOutDate: newCheckOutDate
        }
    })

    return {
        roomId,
        personName,
        peopleComing,
        newCheckInDate,
        newCheckOutDate
    }

})

app.get('/hotels', async (request, reply) => {

    const hotels = await prisma.hotel.findMany()

    return hotels

})


app.get('/reserves/:roomId', async (request, reply) => {

    const getReserveParams = z.object({
        roomId: z.string()
    })

    const { roomId } = getReserveParams.parse(request.params)

    const reserves = await prisma.reserve.findMany({
        where: {
            roomId
        }
    })

    return reserves

})

app.get('/rooms', async (request, reply) => {

    const rooms = prisma.room.findMany()

    return rooms

})