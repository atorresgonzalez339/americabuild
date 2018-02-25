<?php

namespace AppBundle\Libs\Helper;


class SendCustomEmail
{

    private $container;
    private $dir;

    public function __construct($container)
    {
        $this->container = $container;
        $separator = DIRECTORY_SEPARATOR;
        $this->dir = $this->container->getParameter('kernel.root_dir') . "$separator" . "logs" . $separator . "emails" . $separator;
    }

    public function sendMessage($typeMail)
    {
        $mailAcount = $this->container->getParameter('mailer_user');

        if ($mailAcount) {

            $message = \Swift_Message::newInstance()
                ->setSubject("SUBJECT")
                ->setFrom("FROM@ACCOUNT")
                ->setTo("TO@ACCOUNT")
                ->setBody("BODY");

            try {
                $send = $this->container->get('swiftmailer.mailer.default')->send($message);

                if ($send) {
                    $this->registerTraceOfEmail('FAILED_TRACE');
                } else {
                    $this->registerTraceOfEmail('FAILED_TRACE');
                }
            } catch (\Exception $e) {

                $this->registerTraceOfEmail('FAILED_TRACE');
            }
        } else {
            $this->registerTraceOfEmail('SUCCESS_TRACE');
        }
    }

    private function registerTraceOfEmail($text)
    {
        try {
            $date = new \DateTime('now');
            $date = $date->format('YmdHis');
            $myfile = @fopen($this->dir . ($date . uniqid()) . ".log", "w");

            @fwrite($myfile, $text);
        } catch (\Exception $e) {

        }
    }
}
