import { Request, Response } from "express";

import connection from "../database/connection";
import getUserId from "../utils/getUserId";
import Logger from "../utils/Logger";

const logger = new Logger();

export default class ProfileController {
  async index(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = getUserId(String(request.headers.session));

      const profile = await connection("profile")
        .where({ "user_id": user_id })
        .select([
          "first_name",
          "surname",
          "url_photo",
          "birthday",
          "biography",
          "facebook_profile",
          "twitter_profile",
          "instagram_profile",
          "personal_site_url",
          "created_at",
          "updated_at"
        ]);

      if (!profile) {

        throw "Error on get this profile.";    
      }

      return response
        .status(200)
        .json({ profile });

    } catch (error) {

      logger.makeLog("GetProfile", error);

      return response
        .status(500)
        .json({ error: "There was an error. The system administrator was notified and working to solve this." });
    }
  }

  async create(request: Request, response: Response): Promise<Response> {
    try {
      const { first_name, surname, url_photo, birthday, biography, facebook_profile, twitter_profile, instagram_profile, personal_site_url } = request.body;
      const user_id = getUserId(String(request.headers.session));
      const created_at = new Date();
      const updated_at = new Date();

      const profile_added = await connection("profile")
        .insert({
          first_name,
          surname,
          url_photo,
          birthday,
          biography,
          facebook_profile,
          twitter_profile,
          instagram_profile,
          personal_site_url,
          user_id,
          created_at,
          updated_at
        });

      if (!profile_added) {

        throw "Error on create this profile";
      }

      return response
        .status(201)
        .json({ message: "Profile created successfully."});

    } catch (error) {

      logger.makeLog("CreateProfile", error);

      return response
        .status(500)
        .json({ error: "There was an error. The system administrator was notified and working to solve this." });
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    try {
      const { first_name, surname, url_photo, birthday, biography, facebook_profile, twitter_profile, instagram_profile, personal_site_url } = request.body;
      const user_id = getUserId(String(request.headers.session));
      const updated_at = new Date();

      const update = await connection("profile")
        .where({ user_id })
        .update({
          first_name,
          surname,
          url_photo,
          birthday,
          biography,
          facebook_profile,
          twitter_profile,
          instagram_profile,
          personal_site_url,
          updated_at
        });

      if (update !== 1) {

        throw "Error on update this profile.";
      }

      return response
        .status(200)
        .json({ message: "Profile updated successfully."});

    } catch (error) {

      logger.makeLog("UpdateProfile", error);

      return response
        .status(500)
        .json({ error: "There was an error. The system administrator was notified and working to solve this." });
    }
  }
}