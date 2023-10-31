import { type Request, type Response } from 'express';
import { type ApiResponse } from 'src/domain/response';
import { type PostRoomRequest } from '../interface/chat';
import { insertRoom, selectRoom, selectRoomsByUid } from '../service/RoomService';

export const getRooms = async (req: Request, res: Response): Promise<void> => {
  try {
    const uid: string = req.body.uid;
    const resData: ApiResponse = await selectRoomsByUid(uid);

    res.status(200).send(resData);
  } catch (err) {
    const resData: ApiResponse = {
      ok: false,
      msg: 'INTERNAL SERVER ERROR'
    };
    res.status(500).send(resData);
  }
};

export const getRoom = async (req: Request, res: Response): Promise<void> => {
  try {
    const roomId: number = parseInt(req.params.roomId, 10);
    const data = await selectRoom(roomId);

    res.status(200).send({
      ok: true,
      msg: 'Successfully Get',
      data
    });
  } catch (err) {
    const result: ApiResponse = {
      ok: false,
      msg: 'INTERNAL SERVER ERROR'
    };
    res.status(500).send(result);
  }
};

export const postRoom = async (req: Request, res: Response): Promise<void> => {
  try {
    const roomObject: PostRoomRequest = {
      uid: req.body.uid,
      reportUid: req.body.reportUid,
      isAccident: req.body.isAccident,
      id: req.body.id
    };

    const resData: ApiResponse = await insertRoom(roomObject);

    res.status(200).send(resData);
  } catch (err) {
    const resData: ApiResponse = {
      ok: false,
      msg: 'INTERNAL SERVER ERROR'
    };
    res.status(500).send(resData);
  }
};
