<?php
/*
PHPDoctor: The PHP Documentation Creator
Copyright (C) 2004 Paul James <paul@peej.co.uk>

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
*/

// load classes
require 'htmlWriter.php';
require 'frameOutputWriter.php';
require 'frameIndexWriter.php';
require 'namespaceIndexWriter.php';
require 'namespaceWriter.php';
require 'classWriter.php';

/** The standard doclet. This doclet generates HTML output similar to that
 * produced by the Javadoc standard doclet.
 *
 * @package PHPDoctor\Doclets\Modern
 */
class Modern extends Doclet
{

    /** A reference to the root doc.
     *
     * @var rootDoc
     */
    public $_rootDoc;

    /** The directory to place the generated files.
     *
     * @var str
     */
    public $_d;

    /** Specifies the title to be placed in the HTML <title> tag.
     *
     * @var str
     */
    public $_windowTitle = 'The Unknown Project';

    /** Specifies the title to be placed near the top of the overview summary
     * file.
     *
     * @var str
     */
    public $_docTitle = 'The Unknown Project';

    /** Doclet constructor.
     *
     * @param RootDoc rootDoc
     * @param TextFormatter formatter
     */
    public function modern(&$rootDoc, $formatter)
    {

        // set doclet options
        $this->_rootDoc =& $rootDoc;
        $phpdoctor =& $rootDoc->phpdoctor();
        $options =& $rootDoc->options();

        $this->formatter = $formatter;

        if (isset($options['d'])) {
            $this->_d = $phpdoctor->makeAbsolutePath($options['d'], $phpdoctor->sourcePath());
        } elseif (isset($options['output_dir'])) {
            $this->_d = $phpdoctor->makeAbsolutePath($options['output_dir'], $phpdoctor->sourcePath());
        } else {
            $this->_d = $phpdoctor->makeAbsolutePath('apidocs', $phpdoctor->sourcePath());
        }
        $this->_d = $phpdoctor->fixPath($this->_d);

        if (is_dir($this->_d)) {
            $phpdoctor->warning('Output directory already exists, overwriting');
        } else {
            mkdir($this->_d);
        }
        $phpdoctor->verbose('Setting output directory to "'.$this->_d.'"');

        if (isset($options['windowtitle'])) $this->_windowTitle = $options['windowtitle'];
        if (isset($options['doctitle'])) $this->_docTitle = $options['doctitle'];

        $frameOutputWriter = new FrameOutputWriter($this);
        $frameIndexWriter = new FrameIndexWriter($this);
        $namespaceIndexWriter = new NamespaceIndexWriter($this);
        $namespaceWriter = new NamespaceWriter($this);
        $classWriter = new ClassWriter($this);

        // copy stylesheet
        $phpdoctor->message('Copying stylesheet');
        copy($phpdoctor->docletPath().'stylesheet.css', $this->_d.'stylesheet.css');

    }

    /** Return a reference to the root doc.
     *
     * @return RootDoc
     */
    function &rootDoc()
    {
        return $this->_rootDoc;
    }

    /** Return a reference to the application object.
     *
     * @return PHPDoctor
     */
    function &phpdoctor()
    {
        return $this->_rootDoc->phpdoctor();
    }

    /** Get the destination path to write the doclet output to.
     *
     * @return str
     */
    public function destinationPath()
    {
        return $this->_d;
    }

    /** Return the title to be placed in the HTML <title> tag.
     *
     * @return str
     */
    public function windowTitle()
    {
        return $this->_windowTitle;
    }

    /** Return the title to be placed near the top of the overview summary
     * file.
     *
     * @return str
     */
    public function docTitle()
    {
        return $this->_docTitle;
    }

    /** Return the header text to be placed at the top of each output file.
     * The header will be placed to the right of the upper navigation bar.
     *
     * @return str
     */
    public function getHeader()
    {
        return $this->_header;
    }

    /** Return the footer text to be placed at the bottom of each output file.
     * The footer will be placed to the right of the lower navigation bar.
     *
     * @return str
     */
    public function getFooter()
    {
        return $this->_footer;
    }

    /** Return the text to be placed at the bottom of each output file. The
     * text will be placed at the bottom of the page, below the lower navigation
     * bar.
     *
     * @return str
     */
    public function bottom()
    {
        return $this->_bottom;
    }

    /** Return whether to create a class tree or not.
     *
     * @return bool
     */
    public function tree()
    {
        return $this->_tree;
    }

    /** Return the version of PHPDoctor.
     *
     * @return str
     */
    public function version()
    {
        $phpdoctor =& $this->_rootDoc->phpdoctor();

        return $phpdoctor->version();
    }

    /** Should we be outputting the source code?
     *
     * @return bool
     */
    public function includeSource()
    {
        return $this->_includeSource;
    }

    /**
     * Format a URL link
     *
     * @param str url
     * @param str text
     */
    public function formatLink($url, $text)
    {
        return '<a href="'.$url.'">'.$text.'</a>';
    }

    /**
     * Format text as a piece of code
     *
     * @param str text
     * @return str
     */
    public function asCode($text)
    {
        return '<code>'.$text.'</code>';
    }

}
