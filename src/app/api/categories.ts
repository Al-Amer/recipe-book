import dbCon from '@/lib/dbCon';
import { neon } from '@neondatabase/serverless';
import { NextApiRequest, NextApiResponse } from 'next'
import React from 'react'
// import dbCon from '../../lib/dbCon'

export default async function handlerCategories(req:NextApiRequest, res: NextApiResponse) {
    // const db = dbCon();
    const db = dbCon();
    const rows = await db`SELECT * FROM categories`;
    
    console.log(rows);
  res.status(200).json(rows);
    //  const sql = process.env.DATABASE_URL;
    //  const response = await sql' SELECT * from categories';

}